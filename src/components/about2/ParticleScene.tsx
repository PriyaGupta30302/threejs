'use client';

import React, { useRef, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { globalScrollState } from './scrollState';
import { MathUtils } from 'three';
import BrainParticle from './BrainParticle';
import BulbParticle from './BulbParticle';
import CircleParticle from './CircleParticle';

interface ParticleSceneProps {
  activeTech: string | null;
  isMobile?: boolean;
}

export default function ParticleScene({ activeTech, isMobile = false }: ParticleSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse to -1 to 1
      mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    // Smooth scroll camera/group based on progress
    const progress = globalScrollState.progress;
    
    // Parallax and smooth rotation based on mouse
    targetRotation.current.x = MathUtils.lerp(targetRotation.current.x, mousePos.current.y * 0.2, 0.05);
    targetRotation.current.y = MathUtils.lerp(targetRotation.current.y, mousePos.current.x * 0.2, 0.05);

    // Apply scroll based rotation
    groupRef.current.rotation.y = targetRotation.current.y + progress * Math.PI * 2;
    groupRef.current.rotation.x = targetRotation.current.x + Math.sin(progress * Math.PI) * 0.5;
    
    // Shift down slightly so it doesn't overlap the navbar
    const targetY = progress < 0.75 ? (isMobile ? -0.3 : -0.4) : 0.0;
    groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);

    // Shift to the right for desktop to align with text (slightly reduced for right padding)
    const targetX = progress < 0.75 ? (isMobile ? 0.0 : 1.6) : 0.0;
    groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);

    // Adjust scale for mobile
    const targetScale = isMobile ? 0.7 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <BrainParticle activeTech={activeTech} isMobile={isMobile} />
        <BulbParticle activeTech={activeTech} isMobile={isMobile} />
        <CircleParticle activeTech={activeTech} isMobile={isMobile} />
      </Suspense>
    </group>
  );
}
