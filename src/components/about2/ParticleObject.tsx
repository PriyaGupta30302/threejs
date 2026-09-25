'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { globalScrollState } from './scrollState';
import { MathUtils } from 'three';

const vertexShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform float uIsTechHovered;
  
  attribute vec3 aTarget1;
  attribute vec3 aTarget2;
  attribute float aSize;
  attribute float aRandom;
  
  varying vec3 vColor;
  varying float vAlpha;

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
    float hoverEffect = mix(1.0, 1.5 + aRandom * 0.5, uIsTechHovered);
    float time = uTime * (1.0 + uIsTechHovered * 2.0);
    
    // Add organic noise movement
    // Heavy noise for the brain, clean surface for the bulb and sphere
    float ambientNoiseIntensity = mix(0.2, 0.05, morph1);
    
    float noise1 = snoise(vec3(currentPos.x * 1.5, currentPos.y * 1.5, currentPos.z * 1.5 + time * 0.2));
    float noise2 = snoise(vec3(currentPos.y * 2.0, currentPos.z * 2.0, currentPos.x * 2.0 + time * 0.3));
    
    currentPos += vec3(noise1, noise2, noise1 * noise2) * ambientNoiseIntensity * hoverEffect;
    
    // Colors based on noise to create patches of purple, gold, cyan, white
    // Restored to vibrant colors since Normal Blending will prevent blowing out to white
    vec3 colorGold = vec3(0.96, 0.78, 0.15);
    vec3 colorPurple = vec3(0.6, 0.3, 0.9);
    vec3 colorCyan = vec3(0.2, 0.9, 0.9);
    vec3 colorWhite = vec3(1.0, 1.0, 1.0);
    
    float colorNoise = snoise(pos * 0.8 + time * 0.1);
    
    if (colorNoise < -0.3) {
      vColor = mix(colorPurple, colorCyan, (colorNoise + 1.0) * 1.5);
    } else if (colorNoise < 0.2) {
      vColor = mix(colorCyan, colorGold, (colorNoise + 0.3) * 2.0);
    } else {
      vColor = mix(colorGold, colorWhite, (colorNoise - 0.2) * 1.25);
    }
    
    // Add hover effect
    vColor = mix(vColor, vec3(0.2, 0.9, 0.9), uIsTechHovered * 0.4);
    
    // Set alpha higher so the 3D mesh is clearly visible
    vAlpha = mix(0.4, 0.9, aRandom);
    
    // Apply heavy noise displacement to the base shape to create the "folded brain" look
    // Only apply to the main structure, not the background scatter (aRandom > 0.8 is background)
    // Fade this wrinkle effect out as uProgress increases so the Bulb and Circle are clean
    float brainWrinkleIntensity = 1.0 - smoothstep(0.0, 0.3, uProgress);
    
    if (aRandom < 0.8) {
      vec3 normal = normalize(currentPos);
      float displace = snoise(currentPos * 1.5 + time * 0.2) * 0.6 * brainWrinkleIntensity;
      currentPos += normal * displace;
    }
    
    // Projection
    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Point size increased for visibility
    float baseSize = mix(50.0, 150.0, aSize);
    gl_PointSize = baseSize * (1.0 / -mvPosition.z) * hoverEffect;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    
    // Triangle math
    float a = atan(uv.x, uv.y) + 3.14159;
    float r = 3.14159 * 2.0 / 3.0;
    float d = cos(floor(0.5 + a/r) * r - a) * length(uv);
    
    // Solid vs Hollow (Outline) based on alpha variation hack
    // If vAlpha is exactly 0.99, we'll treat it as a signal for a hollow triangle.
    // Otherwise it's solid.
    
    float size = 0.2;
    float thickness = 0.03;
    
    float alpha = 1.0 - smoothstep(size - 0.02, size + 0.02, d);
    
    // If it's a background element (we mapped this in geometry), make some hollow
    if (vAlpha > 0.95 && vAlpha < 0.99) {
      float inner = 1.0 - smoothstep(size - thickness - 0.02, size - thickness + 0.02, d);
      alpha -= inner;
    }
    
    if (alpha < 0.01) discard;
    
    gl_FragColor = vec4(vColor, alpha * vAlpha);
  }
`;

interface ParticleObjectProps {
  activeTech: string | null;
}

export default function ParticleObject({ activeTech }: ParticleObjectProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Create particle geometry data
  const { positions, target1, target2, sizes, randoms } = useMemo(() => {
    const count = 12000;
    const structureCount = 10000;
    
    const positions = new Float32Array(count * 3);
    const target1 = new Float32Array(count * 3);
    const target2 = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const randoms = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      if (i < structureCount) {
        // STRUCTURED GRID (Fibonacci sphere, Y is UP)
        const y_norm = 1.0 - 2.0 * (i + 0.5) / structureCount; // 1 to -1
        const radius_at_y = Math.sqrt(1.0 - y_norm * y_norm);
        const theta = Math.PI * (1.0 + Math.sqrt(5)) * (i + 0.5);
        
        // ------------------------------------
        // Base Hero Shape: The Brain
        // ------------------------------------
        const r1 = 1.6;
        let bx = r1 * radius_at_y * Math.cos(theta);
        let by = r1 * y_norm;
        let bz = r1 * radius_at_y * Math.sin(theta);
        
        // Create Brain Fissure (gap in the middle along X axis)
        const gap = 0.12;
        bx = bx > 0 ? bx + gap : bx - gap;
        
        // Elongate front-to-back (Z axis)
        bz *= 1.15;
        
        // Flatten bottom slightly
        if (by < -0.6) by = -0.6 + (by + 0.6) * 0.5;

        positions[i3] = bx;
        positions[i3 + 1] = by;
        positions[i3 + 2] = bz;
        
        // ------------------------------------
        // Target 1: Lightbulb
        // ------------------------------------
        // Shift bulb up slightly so it's centered visually
        const yBulb = y_norm * 1.6 + 0.2; 
        let rBulb;
        if (yBulb > 0.4) {
          // Top sphere of the bulb
          rBulb = Math.sqrt(Math.max(0, 1.3 * 1.3 - Math.pow(yBulb - 0.4, 2)));
        } else {
          // Tapered neck
          const t = (0.4 - yBulb) / 2.0; // 0 to 1
          rBulb = 1.3 * Math.exp(-t * 2.5);
          rBulb = Math.max(0.4, rBulb); // Base thickness
          
          // Screw ridges at the bottom
          if (yBulb < -1.1) {
            rBulb += Math.sin(yBulb * 40) * 0.04;
          }
        }
        target1[i3] = rBulb * Math.cos(theta);
        target1[i3 + 1] = yBulb;
        target1[i3 + 2] = rBulb * Math.sin(theta);
        
        // ------------------------------------
        // Target 2: Perfect Sphere
        // ------------------------------------
        const rSphere = 1.7;
        target2[i3] = rSphere * radius_at_y * Math.cos(theta);
        target2[i3 + 1] = rSphere * y_norm;
        target2[i3 + 2] = rSphere * radius_at_y * Math.sin(theta);
        
        randoms[i] = Math.random() * 0.7; // Below 0.8 means solid
      } else {
        // BACKGROUND SCATTER
        const y_norm = 1.0 - 2.0 * Math.random();
        const radius_at_y = Math.sqrt(1.0 - y_norm * y_norm);
        const theta = Math.random() * 2 * Math.PI;
        const r = 4.0 + Math.random() * 4.0;
        
        positions[i3] = r * radius_at_y * Math.cos(theta);
        positions[i3 + 1] = r * y_norm;
        positions[i3 + 2] = r * radius_at_y * Math.sin(theta);
        
        // Keep them scattered for other states too
        target1[i3] = positions[i3] * 1.2;
        target1[i3 + 1] = positions[i3 + 1] * 1.2;
        target1[i3 + 2] = positions[i3 + 2] * 1.2;
        
        target2[i3] = positions[i3] * 1.5;
        target2[i3 + 1] = positions[i3 + 1] * 1.5;
        target2[i3 + 2] = positions[i3 + 2] * 1.5;
        
        // Randoms > 0.8 means it's a background element.
        randoms[i] = 0.85 + Math.random() * 0.15; 
      }

      sizes[i] = Math.random(); 
    }
    
    return { positions, target1, target2, sizes, randoms };
  }, []);

  // Update uniforms
  const hoveredValue = useRef(0);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smooth scroll progress update
      const currentProg = materialRef.current.uniforms.uProgress.value;
      const targetProg = globalScrollState.progress;
      materialRef.current.uniforms.uProgress.value = MathUtils.lerp(currentProg, targetProg, 0.05);
      
      // Smooth hover state
      const targetHover = activeTech ? 1.0 : 0.0;
      hoveredValue.current = MathUtils.lerp(hoveredValue.current, targetHover, 0.1);
      materialRef.current.uniforms.uIsTechHovered.value = hoveredValue.current;
    }
  });

  return (
    <points>
      <bufferGeometry>
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
        }}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
