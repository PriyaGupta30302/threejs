'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';
import { globalScrollState } from './scrollState';
import { MathUtils } from 'three';

const vertexShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform float uIsTechHovered;
  uniform float uIsMobile;
  uniform vec2 uMouse;
  
  attribute vec3 aTarget1;
  attribute vec3 aTarget2;
  attribute float aSize;
  attribute float aRandom;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vRandom;

  // Simple 3D noise function
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  
  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  
    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
  
    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
  
    //  x0 = x0 - 0.0 + 0.0 * C 
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  
    // Permutations
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  
    // Gradients
    // ( N*N points uniformly over a square, mapped onto an octahedron.)
    float n_ = 1.0/7.0; // N=7
    vec3  ns = n_ * D.wyz - D.xzx;
  
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)
  
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
  
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
  
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
  
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
  
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
  
    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
  
    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vRandom = aRandom;
    // Determine section transitions based on uProgress
    // uProgress goes 0 to 1 across the whole page (4 sections)
    
    // Smooth stepping for morphing
    // 0.1 -> 0.3 (Hero to About): Brain to Bulb
    // 0.7 -> 0.9 (Experience to Toolkit): Bulb to Circle
    float morph1 = smoothstep(0.1, 0.3, uProgress);
    float morph2 = smoothstep(0.7, 0.9, uProgress);
    
    // Base position
    vec3 pos = position;
    
    // Morph logic
    vec3 currentPos = mix(pos, aTarget1, morph1);
    currentPos = mix(currentPos, aTarget2, morph2);
    
    // Tech hover effect (explode slightly and speed up noise)
    float hoverEffect = mix(1.0, 1.2 + aRandom * 0.2, uIsTechHovered);
    float time = uTime * 0.3;
    
    // Smooth fluid motion instead of erratic blinking noise
    float fluidX = sin(pos.y * 3.0 + time) * cos(pos.z * 2.0 + time * 0.8);
    float fluidY = cos(pos.x * 3.0 + time * 1.1) * sin(pos.z * 2.0 + time * 0.9);
    float fluidZ = sin(pos.x * 3.0 + time * 1.2) * cos(pos.y * 2.0 + time);
    
    // Fade out fluid motion almost entirely so they stick perfectly to the exact brain shape
    float motionIntensity = mix(0.002, 0.0, morph1);
    currentPos += vec3(fluidX, fluidY, fluidZ) * motionIntensity * hoverEffect;
    
    // --- ORGANIC 3D MOUSE DISPLACEMENT ---
    // Calculate screen space position to find distance to mouse
    vec4 projectedForMouse = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vec2 screenPos = projectedForMouse.xy / projectedForMouse.w;
    
    float dist = distance(screenPos, uMouse);
    
    // 1. Organic Irregular Boundary
    // Use 3D noise (mapped 0 to 1) based on the original stable position
    float fieldNoise = snoise(pos * 2.0 + vec3(time * 0.3)) * 0.5 + 0.5;
    
    // Larger base radius for a wider, more noticeable spread
    float baseRadius = uIsMobile > 0.5 ? 0.7 : 0.55;
    
    // Modulate radius per-particle to create a soft, cloud-like irregular edge
    float organicRadius = baseRadius * (0.4 + 0.6 * fieldNoise) * (0.6 + 0.8 * aRandom);
    
    // 2. Smooth Falloff
    // Influence is 1.0 at cursor, tapering off organically to 0.0 at organicRadius
    float influence = 1.0 - smoothstep(0.0, organicRadius, dist);
    
    // Apply easing for extremely soft edges
    influence = smoothstep(0.0, 1.0, influence);
    
    // 3. Direction of Displacement
    // Primary push is outward from cursor in 2D
    vec2 pushDir2D = normalize(screenPos - uMouse + vec2(0.0001)); 
    
    // Convert to 3D and add chaotic scatter for a natural cloud feel
    float scatterX = snoise(pos * 3.0 + vec3(time * 0.4));
    float scatterY = snoise(pos * 3.0 - vec3(time * 0.4));
    float scatterZ = snoise(pos * 2.0 + vec3(time * 0.2)); 
    
    // Blend pure outward push with organic scatter.
    vec3 scatterVec = vec3(scatterX, scatterY, scatterZ);
    vec3 finalPushDir = normalize(vec3(pushDir2D, 0.0) + scatterVec * (0.5 + 0.5 * aRandom));
    
    // 4. Apply Displacement
    float maxPush = 1.0; // Pushed further so the spread is more obvious
    
    // Modulate push strength per-particle
    float particleStrength = 0.4 + 0.6 * aRandom;
    
    // Only displace the main structure strongly, background scatter very subtly
    float structureMask = smoothstep(0.95, 0.85, aRandom);
    
    // The final smooth displacement
    currentPos += finalPushDir * influence * maxPush * particleStrength * structureMask;
    
    // Colors based on smooth, regional gradients (matching the reference video)
    // Left side purple/cyan, right side gold/white
    vec3 colorGold = vec3(1.0, 0.8, 0.2);
    vec3 colorPurple = vec3(0.6, 0.2, 0.9);
    vec3 colorCyan = vec3(0.1, 0.8, 0.9);
    vec3 colorWhite = vec3(1.0, 1.0, 1.0);
    
    // Slower, wider noise so colors don't flicker/blink rapidly
    float colorNoise = snoise(pos * 0.15 + time * 0.02); 
    
    // Base color based on original position X
    vec3 baseCol = mix(colorPurple, colorGold, smoothstep(-1.5, 1.5, pos.x));
    
    // Add Cyan near the bottom
    baseCol = mix(colorCyan, baseCol, smoothstep(-1.5, 0.0, pos.y));
    
    // Add extra vibrant randomized colors for background particles
    if (aRandom > 0.8) {
        float randColor = fract(aRandom * 45.123 + pos.x * 0.1 + pos.y * 0.2);
        if (randColor < 0.33) {
            baseCol = colorPurple * 1.5;
        } else if (randColor < 0.66) {
            baseCol = colorCyan * 1.5;
        } else {
            baseCol = colorGold * 1.5;
        }
    }
    
    // Add white highlights on high noise areas
    vColor = mix(baseCol, colorWhite, smoothstep(0.3, 0.8, colorNoise));
    
    // Add hover effect
    vColor = mix(vColor, vec3(0.2, 0.9, 0.9), uIsTechHovered * 0.4);
    
    // Set alpha higher so the 3D mesh is clearly visible
    vAlpha = mix(0.4, 0.9, aRandom);
    
    // Apply displacement (removed the fake brain wrinkle noise to preserve exact original model lines)
    // Only apply to the main structure, not the background scatter
    if (aRandom < 0.8) {
       // We keep the morph logic intact but remove the extra fake surface noise
    }
    
    // Projection
    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Point size (Restored back to large sizes for the brain structure)
    float baseSize = mix(30.0, 75.0, aSize);
    
    // Background particles scale
    if (aRandom > 0.8) {
        baseSize *= 1.1; 
    }
    
    // Smooth zoom in/out (pulsing) for each particle
    float pulse = sin(uTime * (1.5 + aRandom) + aRandom * 6.28) * 0.3 + 0.7; 
    
    // Clamp the perspective division so particles near the camera don't become massively huge
    float perspective = 1.0 / max(3.0, -mvPosition.z);
    
    gl_PointSize = baseSize * perspective * hoverEffect * pulse;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vRandom;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    
    // Triangle math
    float a = atan(uv.x, uv.y) + 3.14159;
    float r = 3.14159 * 2.0 / 3.0;
    float d = cos(floor(0.5 + a/r) * r - a) * length(uv);
    
    // Solid vs Hollow (Outline) based on alpha variation hack
    // If vAlpha is exactly 0.99, we'll treat it as a signal for a hollow triangle.
    // Otherwise it's solid.
    
    float size = 0.25;
    float thickness = 0.03; // Thinner outlines for large, elegant triangles
    
    float alpha = 1.0 - smoothstep(size - 0.02, size + 0.02, d);
    
    // Make ~50% of the main brain particles hollow (outline only)
    // Keep background particles (vRandom > 0.8) completely solid so they pop!
    if (vRandom > 0.5 && vRandom < 0.8 && vAlpha < 0.95) {
      float inner = 1.0 - smoothstep(size - thickness - 0.02, size - thickness + 0.02, d);
      alpha -= inner;
    }
    
    if (alpha < 0.01) discard;
    
    gl_FragColor = vec4(vColor, alpha * vAlpha);
  }
`;

interface ParticleObjectProps {
  activeTech: string | null;
  isMobile?: boolean;
}

export default function ParticleObject({ activeTech, isMobile = false }: ParticleObjectProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Load the actual brain 3D model provided by the user
  const fbx = useFBX('/31-mozgani/brain.fbx');
  
  // Create particle geometry data
  const { positions, target1, target2, sizes, randoms } = useMemo(() => {
    
    // Extract vertices from the FBX model
    let rawVerts: THREE.Vector3[] = [];
    fbx.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const posAttr = mesh.geometry.attributes.position;
        if (posAttr) {
           mesh.updateMatrixWorld();
           const mat = mesh.matrixWorld;
           const v = new THREE.Vector3();
           for (let i = 0; i < posAttr.count; i++) {
               v.fromBufferAttribute(posAttr, i);
               v.applyMatrix4(mat);
               rawVerts.push(v.clone());
           }
        }
      }
    });
    
    if (rawVerts.length === 0) {
        rawVerts.push(new THREE.Vector3(0,0,0)); // Fallback
    }
    
    // Sample down to a reasonable structure count for performance
    // High density to ensure particles stick together and form precise brain lines
    const desiredStructureCount = isMobile ? 12000 : 45000;
    let sampledVerts: THREE.Vector3[] = [];
    
    if (rawVerts.length > desiredStructureCount) {
        const step = rawVerts.length / desiredStructureCount;
        for (let i = 0; i < desiredStructureCount; i++) {
            sampledVerts.push(rawVerts[Math.floor(i * step)]);
        }
    } else {
        sampledVerts = rawVerts;
    }
    
    // Center and scale the model perfectly to fit the screen
    const box = new THREE.Box3().setFromPoints(sampledVerts);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);
    
    // We want the maximum dimension of the brain to be around 5.5 units wide (larger)
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 5.5 / (maxDim || 1);
    
    const structureCount = sampledVerts.length;
    const bgCount = isMobile ? 500 : 1000; // Balanced background scatter
    const count = structureCount + bgCount;
    
    const positions = new Float32Array(count * 3);
    const target1 = new Float32Array(count * 3);
    const target2 = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const randoms = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      if (i < structureCount) {
        let v = sampledVerts[i];
        
        // Center and scale
        let bx = (v.x - center.x) * scale;
        let by = (v.y - center.y) * scale;
        let bz = (v.z - center.z) * scale;
        
        // Let's add the 3/4 angle rotation that the user requested earlier
        // FBX orientation might differ, but assuming standard orientation, 
        // we rotate Y by -45 degrees and slightly tilt X.
        const rotY = -Math.PI / 4; 
        const rotX = Math.PI / 10; 

        let bx_r = bx * Math.cos(rotY) - bz * Math.sin(rotY);
        let bz_r = bx * Math.sin(rotY) + bz * Math.cos(rotY);
        bx = bx_r; bz = bz_r;

        let by_r = by * Math.cos(rotX) - bz * Math.sin(rotX);
        bz_r = by * Math.sin(rotX) + bz * Math.cos(rotX);
        by = by_r; bz = bz_r;

        positions[i3] = bx; 
        positions[i3 + 1] = by;
        positions[i3 + 2] = bz;
        
        // For the target sphere/bulb we need normal vectors
        let rad = Math.sqrt(bx*bx + by*by + bz*bz);
        let nx = bx / (rad || 1);
        let ny = by / (rad || 1);
        let nz = bz / (rad || 1);
        
        // ------------------------------------
        // Target 1: Lightbulb
        // ------------------------------------
        const yBulb = ny * 1.4 + 0.2; 
        let rBulb;
        if (yBulb > 0.4) {
          rBulb = Math.sqrt(Math.max(0, 1.2 * 1.2 - Math.pow(yBulb - 0.4, 2)));
        } else {
          const t = (0.4 - yBulb) / 2.0;
          rBulb = 1.2 * Math.exp(-t * 2.5);
          rBulb = Math.max(0.4, rBulb);
          if (yBulb < -1.1) {
            rBulb += Math.sin(yBulb * 40) * 0.04;
          }
        }
        
        let theta = Math.atan2(nz, nx);
        // Distribute for targets
        target1[i3] = rBulb * Math.cos(theta);
        target1[i3 + 1] = yBulb;
        target1[i3 + 2] = rBulb * Math.sin(theta);
        
        // ------------------------------------
        // Target 2: Perfect Sphere
        // ------------------------------------
        const rSphere = 1.6;
        target2[i3] = nx * rSphere;
        target2[i3 + 1] = ny * rSphere;
        target2[i3 + 2] = nz * rSphere;
        
        randoms[i] = Math.random() * 0.7; // Below 0.8 means solid
      } else {
        // BACKGROUND SCATTER
        const y_norm = 1.0 - 2.0 * Math.random();
        const radius_at_y = Math.sqrt(1.0 - y_norm * y_norm);
        const theta = Math.random() * 2 * Math.PI;
        const r = 5.0 + Math.random() * 4.0;
        
        positions[i3] = r * radius_at_y * Math.cos(theta);
        positions[i3 + 1] = r * y_norm;
        positions[i3 + 2] = r * radius_at_y * Math.sin(theta);
        
        target1[i3] = positions[i3] * 1.2;
        target1[i3 + 1] = positions[i3 + 1] * 1.2;
        target1[i3 + 2] = positions[i3 + 2] * 1.2;
        
        target2[i3] = positions[i3] * 1.5;
        target2[i3 + 1] = positions[i3 + 1] * 1.5;
        target2[i3 + 2] = positions[i3 + 2] * 1.5;
        
        randoms[i] = 0.85 + Math.random() * 0.15; 
      }

      sizes[i] = Math.random(); 
    }
    
    return { positions, target1, target2, sizes, randoms };
  }, [isMobile, fbx]);

  // Update uniforms
  const hoveredValue = useRef(0);
  const smoothedMouse = useRef(new THREE.Vector2(-999, -999));
  const hasMoved = useRef(false);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uIsMobile.value = isMobile ? 1.0 : 0.0;
      
      // Smooth scroll progress update
      const currentProg = materialRef.current.uniforms.uProgress.value;
      const targetProg = globalScrollState.progress;
      materialRef.current.uniforms.uProgress.value = MathUtils.lerp(currentProg, targetProg, 0.05);
      
      // Update mouse position for repulsion smoothly
      if (state.pointer.x !== 0 || state.pointer.y !== 0) {
          if (!hasMoved.current) {
              // Snap instantly on first interaction to avoid the -999 lerp delay
              smoothedMouse.current.copy(state.pointer);
          }
          hasMoved.current = true;
      }
      
      if (hasMoved.current) {
          smoothedMouse.current.lerp(state.pointer, 0.12); // Slightly faster lerp for better responsiveness
      }
      materialRef.current.uniforms.uMouse.value.copy(smoothedMouse.current);
      
      // Smooth hover state
      const targetHover = activeTech ? 1.0 : 0.0;
      hoveredValue.current = MathUtils.lerp(hoveredValue.current, targetHover, 0.1);
      materialRef.current.uniforms.uIsTechHovered.value = hoveredValue.current;
    }
  });

  return (
    <points>
      <bufferGeometry key={isMobile ? 'mobile' : 'desktop'}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aTarget1"
          args={[target1, 3]}
        />
        <bufferAttribute
          attach="attributes-aTarget2"
          args={[target2, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[randoms, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uIsTechHovered: { value: 0 },
          uIsMobile: { value: isMobile ? 1.0 : 0.0 },
          uMouse: { value: new THREE.Vector2(-999, -999) },
        }}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
