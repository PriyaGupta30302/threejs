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

    // Apply base rotation from mouse parallax only
    groupRef.current.rotation.y = targetRotation.current.y;
    groupRef.current.rotation.x = targetRotation.current.x;
    
    // Base vertical offset - giving the brain model more space from the top
    let targetY = isMobile ? -0.3 : -0.3;
    let targetX = 0.0;

    if (!isMobile) {
        if (progress < 0.20) {
            // Hero to About: Right to Left
            const t = progress / 0.20;
            // Matches user's -2.5 destination for more space
            targetX = MathUtils.lerp(1.6, -2.5, t * t * (3 - 2 * t));
        } else if (progress < 0.30) {
            // About to Gap: Left to Center
            const t = (progress - 0.20) / 0.10;
            // Smoothly move from -2.5 back to Center
            targetX = MathUtils.lerp(-2.5, 0.0, t * t * (3 - 2 * t));
        } else if (progress < 0.40) {
            // Gap Morphing: Stay Center
            targetX = 0.0;
        } else if (progress < 0.50) {
            // Gap to Experience: Move Center to Right and Center Vertically
            const t = (progress - 0.40) / 0.10;
            // Moved to 2.2 for more space from the left side text
            targetX = MathUtils.lerp(0.0, 2.2, t * t * (3 - 2 * t));
            targetY = MathUtils.lerp(-0.3, 0.0, t * t * (3 - 2 * t));
        } else if (progress < 0.70) {
            // Experience Pause: Stay Right and Centered
            targetX = 2.2;
            targetY = 0.0;
        } else if (progress < 0.80) {
            // Experience to Toolkit: Move Right to Center and reset Y
            const t = (progress - 0.70) / 0.10;
            targetX = MathUtils.lerp(2.2, 0.0, t * t * (3 - 2 * t));
            targetY = MathUtils.lerp(0.0, -0.3, t * t * (3 - 2 * t));
        } else {
            // Toolkit and Beyond
            targetX = 0.0;
            targetY = -0.3;
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
