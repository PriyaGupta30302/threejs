'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
uniform float uTime;
uniform float uProgress;

attribute vec3 targetPosition;
attribute float randomOffset;
varying float vProgress;

void main() {
  // Wave animation for base position
  vec3 wavePos = position;
  // 3D rolling hills moving from right to left
  // Reduced amplitude so waves don't block the screen
  float waveHeight = sin(wavePos.x * 0.05 + wavePos.z * 0.05 + uTime * 1.0) * 1.5;
  waveHeight += sin(wavePos.x * 0.1 - wavePos.z * 0.02 + uTime * 1.5) * 0.5;
  wavePos.y += waveHeight;

  // Staggered progress
  float pProgress = clamp((uProgress - randomOffset * 0.4) / (1.0 - randomOffset * 0.4), 0.0, 1.0);
  float easedProgress = smoothstep(0.0, 1.0, pProgress);
  easedProgress = smoothstep(0.0, 1.0, easedProgress);

  vec3 finalPos = mix(wavePos, targetPosition, easedProgress);

  float flightArc = sin(easedProgress * 3.14159265);
  finalPos.y += flightArc * 2.0; 
  finalPos.x += flightArc * (randomOffset - 0.5) * 8.0; 

  vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Smaller, crisper point size
  // Increased base size from 50 to 100 so landscape dots are visible in the distance
  float pointSize = mix(100.0, 80.0, easedProgress);
  gl_PointSize = (pointSize / -mvPosition.z);
  
  vProgress = easedProgress;
}
`;

const fragmentShader = `
varying float vProgress;

void main() {
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  if (distanceToCenter > 0.5) {
    discard;
  }

  // Crisper edge instead of fuzzy glow
  float alpha = smoothstep(0.5, 0.2, distanceToCenter);

  // Vibrant teal color matching the image
  vec3 baseColor = vec3(0.2, 0.6, 0.5);
  vec3 targetColor = vec3(0.2, 0.85, 0.7); 
  vec3 color = mix(baseColor, targetColor, vProgress);

  // Higher opacity for clear distinct dots
  gl_FragColor = vec4(color, alpha * mix(0.5, 0.85, vProgress)); 
}
`;

export function Particles({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const particleCount = 12000;

  const [positions, targetPositions, randomOffsets] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const targetPos = new Float32Array(particleCount * 3);
    const randOffsets = new Float32Array(particleCount);

    const widthSegments = 120;
    const depthSegments = 100;

    for (let i = 0; i < particleCount; i++) {
      const col = i % widthSegments;
      const row = Math.floor(i / widthSegments);
      
      // Keep x and z closer so points don't disappear into sub-pixel sizes
      const x = (col / (widthSegments - 1)) * 120 - 60; 
      const z = (row / (depthSegments - 1)) * 100 - 80; // from -80 to 20
      // Bring y up so it's visible in the lower half of the screen
      const y = -5; 
      pos[i * 3 + 0] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      // Reduce radius noise to make the sphere edges look much sharper and defined
      const radius = 3 + (Math.random() - 0.5) * 0.1;

      targetPos[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
      targetPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      targetPos[i * 3 + 2] = radius * Math.cos(phi);
      
      randOffsets[i] = Math.random();
    }

    return [pos, targetPos, randOffsets];
  }, [particleCount]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly approach the target progress from the ref
      materialRef.current.uniforms.uProgress.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uProgress.value,
        progressRef.current,
        0.05
      );
    }
    
    if (pointsRef.current) {
      // Center the whole system on Y
      // We removed the rotation so the landscape stays perfectly flat and horizontal
      pointsRef.current.position.y = 2; // Offset to counter the camera position at y=2
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-targetPosition"
          count={particleCount}
          array={targetPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-randomOffset"
          count={particleCount}
          array={randomOffsets}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uProgress: { value: 0 },
        }}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
