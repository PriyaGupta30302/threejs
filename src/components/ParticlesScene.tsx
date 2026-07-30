'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
uniform float uTime;
uniform float uProgress;
uniform float uSphereRotY;
uniform float uSphereRotX;
uniform vec3 uMouse;

attribute vec3 targetPosition;
attribute float randomOffset;
varying float vProgress;
varying float vTwinkle;

void main() {
  // Wave animation for base position
  vec3 wavePos = position;
  // 3D rolling hills moving from right to left
  // Using lower frequencies for larger, smoother waves
  float waveHeight = sin(wavePos.x * 0.02 + wavePos.z * 0.02 + uTime * 0.5) * 3.0;
  waveHeight += sin(wavePos.x * 0.05 - wavePos.z * 0.01 + uTime * 0.8) * 1.5;
  
  // Interactive Mouse Ripple (Hover effect)
  float distToMouse = distance(wavePos.xz, uMouse.xz);
  float hoverArea = smoothstep(40.0, 0.0, distToMouse);
  float mouseRipple = sin(distToMouse * 0.4 - uTime * 3.0) * 2.0;
  float mouseEffect = mouseRipple * hoverArea;
  
  wavePos.y += waveHeight + mouseEffect;

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
  
  // Twinkling effect based on time and randomOffset
  float twinkleSpeed = mix(0.5, 2.0, randomOffset);
  float twinkle = sin(uTime * twinkleSpeed + randomOffset * 100.0) * 0.5 + 0.5; // 0 to 1
  vTwinkle = twinkle;

  // Vary the point size to make it look dotted and organic
  float targetSize = mix(50.0, 130.0, randomOffset * 5.0);
  float baseSize = mix(100.0, targetSize, easedProgress) * sizeMultiplier;
  
  // Modulate point size with twinkle so they grow and shrink like stars
  // Keep base size bigger so they remain clearly visible
  float pointSize = mix(baseSize * 0.8, baseSize * 1.3, twinkle);
  
  gl_PointSize = (pointSize / -mvPosition.z);
  
  vProgress = easedProgress;
}
`;

const fragmentShader = `
varying float vProgress;
varying float vTwinkle;

void main() {
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  if (distanceToCenter > 0.5) {
    discard;
  }

  // Crisper edge instead of fuzzy glow
  float alpha = smoothstep(0.5, 0.2, distanceToCenter);

  // Vibrant bright cyan/green color matching the image for clear visibility
  vec3 baseColor = vec3(0.2, 0.8, 0.6);
  vec3 targetColor = vec3(0.2, 0.85, 0.7); 
  vec3 color = mix(baseColor, targetColor, vProgress);

  // Higher opacity for clear distinct dots, modulated by twinkle effect for stars
  float finalAlpha = alpha * mix(0.7, 1.0, vProgress) * mix(0.5, 1.0, vTwinkle);
  gl_FragColor = vec4(color, finalAlpha); 
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
      uMouse: { value: new THREE.Vector3(999, -6, 999) },
    }),
    []
  );

  const targetMouse = useMemo(() => new THREE.Vector3(999, -6, 999), []);

  const [positions, targetPositions, randomOffsets] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const targetPos = new Float32Array(particleCount * 3);
    const randOffsets = new Float32Array(particleCount);

    const widthSegments = 250;
    const depthSegments = 200;

    for (let i = 0; i < particleCount; i++) {
      const col = i % widthSegments;
      const row = Math.floor(i / widthSegments);
      
      // Massive width to ensure the horizon (top of screen) stays perfectly straight and edges are off-screen
      let x = (col / (widthSegments - 1)) * 400 - 200; 
      // Extend Z past the camera (camera is at z=30) so there's NO empty space at the bottom
      let z = (row / (depthSegments - 1)) * 200 - 150; // from -150 to 50
      
      // Add organic sine waves to make the horizontal lines wavy instead of a rigid straight grid
      z += Math.sin(x * 0.05) * 5.0;
      x += Math.sin(z * 0.05) * 2.0;
      
      // Create a downward slope (dhalan) at the front (bottom of screen)
      let y = -6; 
      if (z > 10) {
         // As it gets closer to the camera, it drops down smoothly like a slope
         y -= Math.pow((z - 10) * 0.15, 2.0);
      } 
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
      
      // Smoothly lerp mouse position to target
      materialRef.current.uniforms.uMouse.value.lerp(targetMouse, 0.1);
    }
    
    if (pointsRef.current) {
      // Center the whole system on Y
      // We removed the rotation so the landscape stays perfectly flat and horizontal
      pointsRef.current.position.y = 2; // Offset to counter the camera position at y=2
    }
  });

  return (
    <group>
      <mesh 
        position={[0, -6, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        visible={false}
        onPointerMove={(e) => {
          targetMouse.copy(e.point);
        }}
        onPointerOut={() => {
          targetMouse.set(999, -6, 999);
        }}
      >
        <planeGeometry args={[1000, 1000]} />
      </mesh>
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
    </group>
  );
}
