'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { globalScrollState } from './scrollState';
import { MathUtils } from 'three';

const vertexShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform float uIsTechHovered;
  uniform float uIsMobile;
  uniform vec2 uMouse;
  
  attribute vec3 aNormal;
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
    // Fade Brain in/out based on uProgress
    // Brain is fully visible from 0 to 0.25, fades out completely by 0.35
    float fadeOut = 1.0 - smoothstep(0.25, 0.35, uProgress);
    
    // Base position
    vec3 pos = position;
    vec3 currentPos = pos;

    
    // Tech hover effect (explode slightly and speed up noise)
    float hoverEffect = mix(1.0, 1.2 + aRandom * 0.2, uIsTechHovered);
    float time = uTime * 0.3;
    
    // Smooth fluid motion 
    float fluidX = sin(pos.y * 3.0 + time) * cos(pos.z * 2.0 + time * 0.8);
    float fluidY = cos(pos.x * 3.0 + time * 1.1) * sin(pos.z * 2.0 + time * 0.9);
    float fluidZ = sin(pos.x * 3.0 + time * 1.2) * cos(pos.y * 2.0 + time);
    
    float motionIntensity = 0.002;
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
    
    // Base color based on Fresnel (rim lighting)
    // Reference image has glowing yellow/orange on the edges (rims) and dark purple in the center/valleys
    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    vec3 viewDir = normalize(-mvPosition.xyz);
    
    float facingCamera = dot(aNormal, viewDir);
    float rimFactor = 1.0 - smoothstep(0.0, 0.8, facingCamera);
    
    vec3 baseCol = mix(colorPurple, colorGold, rimFactor);
    
    // Add Cyan near the bottom left
    baseCol = mix(baseCol, colorCyan, smoothstep(-1.5, 0.0, pos.y) * 0.5);
    
    // Boost overall brightness
    baseCol *= 2.5;
    
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
    
    // Calculate true 3D directional lighting based on the model's physical normals
    vec3 lightDir = normalize(vec3(1.0, 1.5, 2.0));
    float diffuse = max(0.0, dot(aNormal, lightDir)) * 0.5 + 0.5;
    
    // Add specular highlight for shinier, more saturated look
    vec3 halfDir = normalize(lightDir + viewDir);
    float specAngle = max(dot(halfDir, aNormal), 0.0);
    float specular = pow(specAngle, 16.0) * 0.8;

    vColor = mix(baseCol * diffuse + specular, colorWhite, smoothstep(0.3, 0.8, colorNoise));
    vColor = mix(vColor, vec3(0.2, 0.9, 0.9), uIsTechHovered * 0.4);
    
    // Density logic: keep particles dense everywhere to make it fully filled
    if (aRandom < 0.8) {
        if (facingCamera < -0.1) {
            // Back faces are slightly faded but not completely hidden, so it still looks dense
            vAlpha = mix(0.15, 0.4, aRandom);
        } else {
            // Front face - full extreme density
            vAlpha = mix(0.7, 1.0, aRandom);
        }
    } else {
        // Background particles
        vAlpha = mix(0.8, 1.0, aRandom); 
    }
    
    // Apply global fade based on scroll progress
    vAlpha *= fadeOut;
    
    // Projection
    gl_Position = projectionMatrix * mvPosition;
    
    // Depth Shading: Darken particles that are further away from the camera
    float depthFog = smoothstep(-12.0, 0.0, mvPosition.z);
    vColor *= mix(0.1, 1.5, depthFog); // Boost foreground contrast
    
    // Point size: Slightly reduced to allow the massive count to form a solid structure
    float baseSize = mix(35.0, 70.0, aSize);
    
    // Make particles facing away from the center (rims) slightly larger
    baseSize *= mix(0.8, 1.2, rimFactor); 
    
    if (aRandom > 0.8) {
        baseSize *= 1.2; 
    }
    
    float pulse = sin(uTime * (1.5 + aRandom) + aRandom * 6.28) * 0.3 + 0.7; 
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
    
    // Distance field for triangle
    float a = atan(uv.x, uv.y) + 3.14159;
    float r = 3.14159 * 2.0 / 3.0;
    float d = cos(floor(0.5 + a/r) * r - a) * length(uv);
    
    float size = 0.35;
    float thickness = 0.06; // Increased thickness since points are smaller
    
    // Outer border (Sharpened for smaller particles)
    float alpha = 1.0 - smoothstep(size - 0.015, size + 0.015, d);
    float inner = 1.0 - smoothstep(size - thickness - 0.015, size - thickness + 0.015, d);
    float border = alpha - inner;
    
    // Pure hollow triangles matching the reference image perfectly
    float wireframe = border;
    
    float finalAlpha = alpha;
    vec3 finalColor = vColor;
    
    // Solid with fake 3D shading (make it look like a 3D pyramid with lighting)
    // No more hollow wireframes, we use the solid alpha.
    finalAlpha = alpha;
    
    // Dimensional shading to make the flat triangle look 3D
       float sector = floor(0.5 + a/r); // Identifies the 3 faces of the pyramid
       float shade = 1.0;
       if (sector == 0.0) shade = 1.0;       // Top/Front face is bright
       else if (sector == 1.0) shade = 0.6;  // Left face is darker
       else shade = 0.3;                     // Right face is darkest
       
       finalColor *= shade;
    if (finalAlpha < 0.05 || vAlpha < 0.05) discard;
    
    gl_FragColor = vec4(finalColor, finalAlpha * vAlpha);
  }
`;

interface BrainParticleProps {
  activeTech: string | null;
  isMobile?: boolean;
}

export default function BrainParticle({ activeTech, isMobile = false }: BrainParticleProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Load the actual brain 3D model provided by the user
  const gltf = useGLTF('/Rotten Brain.glb');
  
  // Create particle geometry data
  const { positions, normals, sizes, randoms } = useMemo(() => {
    
    // Extract triangles from the GLTF model to sample the exact 3D surface
    const rawTriangles: { pos: THREE.Vector3[], norm: THREE.Vector3 }[] = [];
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const posAttr = mesh.geometry.attributes.position;
        const index = mesh.geometry.index;
        if (posAttr) {
           mesh.updateMatrixWorld();
           const mat = mesh.matrixWorld;
           
           if (index) {
               // Indexed geometry
               for (let i = 0; i < index.count; i += 3) {
                   const a = new THREE.Vector3().fromBufferAttribute(posAttr, index.getX(i)).applyMatrix4(mat);
                   const b = new THREE.Vector3().fromBufferAttribute(posAttr, index.getX(i+1)).applyMatrix4(mat);
                   const c = new THREE.Vector3().fromBufferAttribute(posAttr, index.getX(i+2)).applyMatrix4(mat);
                   
                   // Calculate face normal
                   const cb = new THREE.Vector3().subVectors(c, b);
                   const ab = new THREE.Vector3().subVectors(a, b);
                   const norm = cb.cross(ab).normalize();
                   
                   rawTriangles.push({ pos: [a, b, c], norm });
               }
           } else {
               // Non-indexed geometry
               for (let i = 0; i < posAttr.count; i += 3) {
                   const a = new THREE.Vector3().fromBufferAttribute(posAttr, i).applyMatrix4(mat);
                   const b = new THREE.Vector3().fromBufferAttribute(posAttr, i+1).applyMatrix4(mat);
                   const c = new THREE.Vector3().fromBufferAttribute(posAttr, i+2).applyMatrix4(mat);
                   
                   // Calculate face normal
                   const cb = new THREE.Vector3().subVectors(c, b);
                   const ab = new THREE.Vector3().subVectors(a, b);
                   const norm = cb.cross(ab).normalize();
                   
                   rawTriangles.push({ pos: [a, b, c], norm });
               }
           }
        }
      }
    });
    
    // Extreme particle count to make the brain completely filled and dense
    const desiredStructureCount = isMobile ? 40000 : 150000;
    const sampledVerts: { p: THREE.Vector3, n: THREE.Vector3 }[] = [];
    
    if (rawTriangles.length > 0) {
        // Sample points exactly uniformly across the surface of the triangles
        // This guarantees perfect detailing regardless of how low-poly the base model is
        for (let i = 0; i < desiredStructureCount; i++) {
            const tri = rawTriangles[Math.floor(Math.random() * rawTriangles.length)];
            const r1 = Math.random();
            const r2 = Math.random();
            const sqrtR1 = Math.sqrt(r1);
            const u = 1 - sqrtR1;
            const v = r2 * sqrtR1;
            const w = 1 - u - v;
            const surfaceP = new THREE.Vector3(
                tri.pos[0].x * u + tri.pos[1].x * v + tri.pos[2].x * w,
                tri.pos[0].y * u + tri.pos[1].y * v + tri.pos[2].y * w,
                tri.pos[0].z * u + tri.pos[1].z * v + tri.pos[2].z * w
            );
            
            const p = surfaceP.clone();
            
            // Volumetric filling: Push 30% of particles inside to make the brain solid
            if (Math.random() < 0.3) {
                const depth = Math.pow(Math.random(), 1.0 / 3.0); // uniform volume distribution
                p.lerp(new THREE.Vector3(0,0,0), 1.0 - depth); 
            }
            
            sampledVerts.push({
                p,
                n: tri.norm.clone()
            });
        }
    } else {
        // Fallback
        sampledVerts.push({ p: new THREE.Vector3(0,0,0), n: new THREE.Vector3(0,1,0) });
    }
    
    // Center and scale the model perfectly to fit the screen
    const box = new THREE.Box3().setFromPoints(sampledVerts.map(sv => sv.p));
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
    const normals = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const randoms = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      if (i < structureCount) {
        const v = sampledVerts[i].p;
        const n = sampledVerts[i].n;
        
        // Center and scale
        let bx = (v.x - center.x) * scale;
        let by = (v.y - center.y) * scale;
        let bz = (v.z - center.z) * scale;
        
        // Rotate normals the same way we rotate positions
        let nx_r = n.x, ny_r = n.y, nz_r = n.z;
        
        // Default to a direct side profile view (as requested by the user)
        const rotY = Math.PI / -6; 
        const rotX = 0.0; 
        
        const bx_r = bx * Math.cos(rotY) - bz * Math.sin(rotY);
        let bz_r = bx * Math.sin(rotY) + bz * Math.cos(rotY);
        bx = bx_r; bz = bz_r;
        
        const norm_x_r = nx_r * Math.cos(rotY) - nz_r * Math.sin(rotY);
        let norm_z_r = nx_r * Math.sin(rotY) + nz_r * Math.cos(rotY);
        nx_r = norm_x_r; nz_r = norm_z_r;
        
        const by_r = by * Math.cos(rotX) - bz * Math.sin(rotX);
        bz_r = by * Math.sin(rotX) + bz * Math.cos(rotX);
        by = by_r; bz = bz_r;
        
        const norm_y_r = ny_r * Math.cos(rotX) - nz_r * Math.sin(rotX);
        norm_z_r = ny_r * Math.sin(rotX) + nz_r * Math.cos(rotX);
        ny_r = norm_y_r; nz_r = norm_z_r;
        
        positions[i3] = bx; 
        positions[i3 + 1] = by;
        positions[i3 + 2] = bz;
        
        normals[i3] = nx_r;
        normals[i3 + 1] = ny_r;
        normals[i3 + 2] = nz_r;
        
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
        
        normals[i3] = 0.0;
        normals[i3 + 1] = 0.0;
        normals[i3 + 2] = 1.0;
        
        randoms[i] = 0.85 + Math.random() * 0.15; 
      }

      sizes[i] = Math.random(); 
    }
    
    return { positions, normals, sizes, randoms };
  }, [isMobile, gltf.scene]);

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
          attach="attributes-aNormal"
          args={[normals, 3]}
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
