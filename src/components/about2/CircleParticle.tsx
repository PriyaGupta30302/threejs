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
  uniform float uIsMobile;
  uniform vec2 uMouse;
  
  attribute vec3 aNormal;
  attribute float aSize;
  attribute float aRandom;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vRandom;

  void main() {
    vRandom = aRandom;
    
    // Fade Circle in based on uProgress
    // Circle is visible starting from 0.75
    float fadeIn = smoothstep(0.75, 0.85, uProgress);
    
    vec3 currentPos = position;
    
    // Tech hover effect (explode slightly)
    float hoverEffect = mix(1.0, 1.2 + aRandom * 0.2, uIsTechHovered);
    
    currentPos *= hoverEffect;
    
    // --- ORGANIC 3D MOUSE DISPLACEMENT ---
    vec4 projectedForMouse = projectionMatrix * modelViewMatrix * vec4(currentPos, 1.0);
    vec2 screenPos = projectedForMouse.xy / projectedForMouse.w;
    
    float dist = distance(screenPos, uMouse);
    float baseRadius = uIsMobile > 0.5 ? 0.7 : 0.55;
    float organicRadius = baseRadius * (0.4 + 0.6 * aRandom);
    
    float influence = smoothstep(0.0, 1.0, 1.0 - smoothstep(0.0, organicRadius, dist));
    vec2 pushDir2D = normalize(screenPos - uMouse + vec2(0.0001)); 
    vec3 finalPushDir = normalize(vec3(pushDir2D, 0.0));
    
    float maxPush = 1.0;
    float particleStrength = 0.4 + 0.6 * aRandom;
    float structureMask = smoothstep(0.95, 0.85, aRandom);
    
    currentPos += finalPushDir * influence * maxPush * particleStrength * structureMask;
    
    // Colors
    vec3 colorCyan = vec3(0.1, 0.8, 0.9);
    
    vec3 baseCol = colorCyan * 2.0;
    
    // Calculate position
    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    
    vColor = baseCol;
    
    if (aRandom < 0.8) {
        vAlpha = mix(0.4, 1.0, aRandom);
    } else {
        vAlpha = mix(0.8, 1.0, aRandom); 
    }
    
    vAlpha *= fadeIn; // Global fade based on scroll
    
    gl_Position = projectionMatrix * mvPosition;
    
    float depthFog = smoothstep(-12.0, -1.0, mvPosition.z);
    vColor *= mix(0.2, 1.5, depthFog); 
    
    float baseSize = mix(12.0, 32.0, aSize);
    
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
    
    float a = atan(uv.x, uv.y) + 3.14159;
    float r = 3.14159 * 2.0 / 3.0;
    float d = cos(floor(0.5 + a/r) * r - a) * length(uv);
    
    float size = 0.35;
    float thickness = 0.06;
    
    float alpha = 1.0 - smoothstep(size - 0.015, size + 0.015, d);
    float inner = 1.0 - smoothstep(size - thickness - 0.015, size - thickness + 0.015, d);
    float border = alpha - inner;
    
    float wireframe = border;
    float finalAlpha = alpha;
    vec3 finalColor = vColor;
    
    finalAlpha = alpha;
    
    float sector = floor(0.5 + a/r); 
    float shade = 1.0;
    if (sector == 0.0) shade = 1.0;       
    else if (sector == 1.0) shade = 0.6;  
    else shade = 0.3;                     
    
    finalColor *= shade;
    
    if (finalAlpha < 0.01 || vAlpha < 0.01) discard;
    
    gl_FragColor = vec4(finalColor, finalAlpha * vAlpha);
  }
`;

interface CircleParticleProps {
  activeTech: string | null;
  isMobile?: boolean;
}

export default function CircleParticle({ activeTech, isMobile = false }: CircleParticleProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const { positions, normals, sizes, randoms } = useMemo(() => {
    // Generate only the circle/sphere shape
    const structureCount = isMobile ? 5000 : 20000;
    const bgCount = isMobile ? 500 : 1000;
    const count = structureCount + bgCount;
    
    const positions = new Float32Array(count * 3);
    const normals = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const randoms = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      if (i < structureCount) {
        // Uniform sphere sampling
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        
        const snx = Math.sin(phi) * Math.cos(theta);
        const sny = Math.cos(phi);
        const snz = Math.sin(phi) * Math.sin(theta);
        
        let rSphere = 2.4; 
        
        // Solid fill logic: some particles go inside the volume
        if (Math.random() < 0.6) {
           const depth = Math.pow(Math.random(), 1.0 / 3.0);
           rSphere *= depth;
        }

        positions[i3] = snx * rSphere;
        positions[i3 + 1] = sny * rSphere;
        positions[i3 + 2] = snz * rSphere;
        
        normals[i3] = snx;
        normals[i3 + 1] = sny;
        normals[i3 + 2] = snz;
        
        randoms[i] = Math.random() * 0.7; // Solid marker
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
  }, [isMobile]);

  // Update uniforms
  const hoveredValue = useRef(0);
  const smoothedMouse = useRef(new THREE.Vector2(-999, -999));
  const hasMoved = useRef(false);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uIsMobile.value = isMobile ? 1.0 : 0.0;
      
      const currentProg = materialRef.current.uniforms.uProgress.value;
      const targetProg = globalScrollState.progress;
      materialRef.current.uniforms.uProgress.value = MathUtils.lerp(currentProg, targetProg, 0.05);
      
      if (state.pointer.x !== 0 || state.pointer.y !== 0) {
          if (!hasMoved.current) {
              smoothedMouse.current.copy(state.pointer);
          }
          hasMoved.current = true;
      }
      
      if (hasMoved.current) {
          smoothedMouse.current.lerp(state.pointer, 0.12);
      }
      materialRef.current.uniforms.uMouse.value.copy(smoothedMouse.current);
      
      const targetHover = activeTech ? 1.0 : 0.0;
      hoveredValue.current = MathUtils.lerp(hoveredValue.current, targetHover, 0.1);
      materialRef.current.uniforms.uIsTechHovered.value = hoveredValue.current;
    }
  });

  return (
    <points>
      <bufferGeometry key={isMobile ? 'mobile' : 'desktop'}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aNormal" args={[normals, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
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
