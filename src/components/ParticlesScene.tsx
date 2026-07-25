'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
uniform float uTime;
uniform float uProgress;
uniform float uSphereRotY;
uniform float uSphereRotX;

attribute vec3 targetPosition;
attribute float randomOffset;
varying float vProgress;

void main() {
  // Wave animation for base position
  vec3 wavePos = position;
  // 3D rolling hills moving from right to left
  // Using lower frequencies for larger, smoother waves
  float waveHeight = sin(wavePos.x * 0.02 + wavePos.z * 0.02 + uTime * 0.5) * 3.0;
  waveHeight += sin(wavePos.x * 0.05 - wavePos.z * 0.01 + uTime * 0.8) * 1.5;
  wavePos.y += waveHeight;

  // Staggered progress (reduced stagger delay for faster start)
  float pProgress = clamp((uProgress - randomOffset * 0.2) / (1.0 - randomOffset * 0.2), 0.0, 1.0);
  float easedProgress = smoothstep(0.0, 1.0, pProgress);

  // Rotate the sphere target positions based on accumulated rotation
  float angleY = uSphereRotY;
  float sy = sin(angleY);
  float cy = cos(angleY);
  mat2 rotY = mat2(cy, -sy, sy, cy);
  
  float angleX = uSphereRotX;
  float sx = sin(angleX);
  float cx = cos(angleX);
  mat2 rotX = mat2(cx, -sx, sx, cx);

  vec3 rotatedTarget = targetPosition;
  // Apply Y axis rotation
  rotatedTarget.xz = rotY * rotatedTarget.xz;
  // Apply slight X axis tilt rotation
  rotatedTarget.yz = rotX * rotatedTarget.yz;

  vec3 finalPos = mix(wavePos, rotatedTarget, easedProgress);

  float flightArc = sin(easedProgress * 3.14159265);
  finalPos.y += flightArc * 2.0; 
  finalPos.x += flightArc * (randomOffset - 0.5) * 8.0; 

  vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Hide 80% of particles in the sphere to make it look sparse
  float keepParticle = step(randomOffset, 0.2); 
  float sizeMultiplier = mix(1.0, keepParticle, easedProgress);
  
  // Vary the point size to make it look dotted and organic
  float targetSize = mix(30.0, 120.0, randomOffset * 5.0);
  float pointSize = mix(60.0, targetSize, easedProgress) * sizeMultiplier;
  
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

  const { size } = useThree();
  const aspect = size.width / size.height;
  // If the screen is portrait (mobile), scale down the mesh so it fits the narrow horizontal view
  const meshScale = aspect < 1 ? Math.max(0.5, aspect * 1.6) : 1.0;

  const particleCount = 50000;

  const sphereRotY = useRef(0);
  const sphereRotX = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSphereRotY: { value: 0 },
      uSphereRotX: { value: 0 },
    }),
    []
  );

  const [positions, targetPositions, randomOffsets] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const targetPos = new Float32Array(particleCount * 3);
    const randOffsets = new Float32Array(particleCount);

    const widthSegments = 250;
    const depthSegments = 200;

    for (let i = 0; i < particleCount; i++) {
      const col = i % widthSegments;
      const row = Math.floor(i / widthSegments);
      
      // Widen the grid and extend Z past the camera (z=30) so there's no blank space at the bottom
      const x = (col / (widthSegments - 1)) * 180 - 90; 
      const z = (row / (depthSegments - 1)) * 140 - 100; // from -100 to 40
      // Set y slightly lower to give it a solid base
      const y = -6; 
      pos[i * 3 + 0] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      // Sharp radius for the sphere, the dotted look is handled by particle sizes and sparsity
      const radius = 4.0;

      targetPos[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
      targetPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      targetPos[i * 3 + 2] = radius * Math.cos(phi);
      
      randOffsets[i] = Math.random();
    }

    return [pos, targetPos, randOffsets];
  }, [particleCount]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Faster lerp for immediate response on scroll
      materialRef.current.uniforms.uProgress.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uProgress.value,
        progressRef.current,
        0.2
      );
      
      // Only rotate the sphere when it's fully formed
      if (progressRef.current > 0.95) {
        sphereRotY.current += delta * 0.3;
        sphereRotX.current += delta * 0.15;
      }
      
      materialRef.current.uniforms.uSphereRotY.value = sphereRotY.current;
      materialRef.current.uniforms.uSphereRotX.value = sphereRotX.current;
    }
    
    if (pointsRef.current) {
      // Center the whole system on Y
      // We removed the rotation so the landscape stays perfectly flat and horizontal
      pointsRef.current.position.y = 2; // Offset to counter the camera position at y=2
    }
  });

  return (
    <points ref={pointsRef} scale={meshScale}>
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
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
