'use client';

import React, { useRef, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { globalScrollState } from './scrollState';
import { MathUtils } from 'three';
import MorphingParticles from './MorphingParticles';

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
    
    // Calculate precise target Y and target X based on progress to match 6-section layout
    let targetY = isMobile ? -0.3 : -0.4;
    let targetX = 0.0;
    
    if (!isMobile) {
        if (progress < 0.20) {
            // Section 0 to 1: Move from right (2.2) to left (-2.2)
            const t = progress / 0.20;
            const smoothT = t * t * (3 - 2 * t);
            targetX = MathUtils.lerp(2.2, -2.2, smoothT);
        } else if (progress >= 0.20 && progress < 0.40) {
            // Section 1 to 2 (Gap): Move from left (-2.2) to center (0.0)
            const t = (progress - 0.20) / 0.20;
            const smoothT = t * t * (3 - 2 * t);
            targetX = MathUtils.lerp(-2.2, 0.0, smoothT);
        } else if (progress >= 0.40 && progress < 0.60) {
            // Section 2 (Gap) to 3 (Experience): Move from center (0.0) to right (2.2)
            const t = (progress - 0.40) / 0.20;
            const smoothT = t * t * (3 - 2 * t);
            targetX = MathUtils.lerp(0.0, 2.2, smoothT);
            targetY = MathUtils.lerp(-0.4, -0.6, smoothT); // Drop down for experience
        } else if (progress >= 0.60 && progress < 0.80) {
            // Section 3 to 4 (Toolkit): Move from right (2.2) to center (0.0)
            const t = (progress - 0.60) / 0.20;
            const smoothT = t * t * (3 - 2 * t);
            targetX = MathUtils.lerp(2.2, 0.0, smoothT);
            targetY = MathUtils.lerp(-0.6, 0.0, smoothT); // Reset Y to center
        } else {
            // Section 4 and 5 (Toolkit to CTA): Stay centered
            targetX = 0.0;
            targetY = 0.0;
        }
    } else {
        // Mobile layout: mostly centered
        if (progress >= 0.40 && progress < 0.80) {
            const t = (progress - 0.40) / 0.40;
            const smoothT = t * t * (3 - 2 * t);
            targetY = MathUtils.lerp(-0.3, 0.0, smoothT);
        } else if (progress >= 0.80) {
            targetY = 0.0;
        }
    }

    // Apply with lerp for additional smoothing (spring-like delay)
    groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);

    // Adjust scale for mobile
    const targetScale = isMobile ? 0.7 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <MorphingParticles activeTech={activeTech} isMobile={isMobile} />
      </Suspense>
    </group>
  );
}
