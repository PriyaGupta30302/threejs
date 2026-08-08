"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useInView } from 'framer-motion';

// Define the nodes based on the screenshot
const NODES = [
  // Original Automation
  { id: 'openai', label: 'OpenAI', position: [-3, 2, 0], color: '#000000', icon: 'OpenAI' },
  { id: 'make', label: 'make', position: [-1, 3.2, -1.5], color: '#7E3AF2', icon: 'M' },
  { id: 'lemlist', label: 'lemlist', position: [2, 2.5, -1], color: '#2563EB', icon: 'E' },
  { id: 'pipedrive', label: 'pipedrive', position: [-1.5, 0.8, 1.5], color: '#16A34A', icon: 'P' },
  { id: 'n8n', label: 'n8n', position: [1.8, 0.5, 0.5], color: '#EF4444', icon: 'n8n' },
  { id: 'perplexity', label: 'perplexity', position: [0.5, -0.2, 2], color: '#000000', icon: 'X' },
  { id: 'voiceflow', label: 'Voiceflow', position: [1.2, -1.8, 1], color: '#000000', icon: 'V' },
  { id: 'phantom', label: 'phantom', position: [3, -1, -1.5], color: '#000000', icon: '👻' },
  { id: 'clay', label: 'clay', position: [-2, -2.5, 0], color: '#000000', icon: 'C' },

  // Frontend Tech Stack
  { id: 'react', label: 'React', position: [0, 1.5, 1], color: '#61DAFB', icon: '⚛️' },
  { id: 'nextjs', label: 'Next.js', position: [-2, -0.5, -1], color: '#000000', icon: 'N' },
  { id: 'typescript', label: 'TypeScript', position: [3, 1, 1], color: '#3178C6', icon: 'TS' },
  { id: 'tailwind', label: 'Tailwind', position: [-3.5, 0.2, 0.5], color: '#06B6D4', icon: 'TW' },
  { id: 'threejs', label: 'Three.js', position: [0, -2.2, -1], color: '#000000', icon: 'T' },
  { id: 'gsap', label: 'GSAP', position: [-1, -0.8, -2], color: '#88CE02', icon: 'G' },
  { id: 'framer', label: 'Framer', position: [2.5, -2.5, 0], color: '#0055FF', icon: 'F' },
  { id: 'vercel', label: 'Vercel', position: [1, 3, 0.5], color: '#000000', icon: '▲' },
];

// Helper to generate lots of background dots
function BackgroundDots({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dotCount = isMobile ? 50 : 150;
  const lineCount = isMobile ? 30 : 80;

  const { points, linePositions } = useMemo(() => {
    const vecPoints = [];
    for (let i = 0; i < dotCount; i++) {
      vecPoints.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 7
        )
      );
    }
    
    const lns = [];
    for (let i = 0; i < lineCount; i++) {
      const p1 = vecPoints[Math.floor(Math.random() * vecPoints.length)];
      let p2 = vecPoints[Math.floor(Math.random() * vecPoints.length)];
      while (p1.distanceTo(p2) > 3) {
        p2 = vecPoints[Math.floor(Math.random() * vecPoints.length)];
      }
      lns.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    }
    return { points: vecPoints, linePositions: new Float32Array(lns) };
  }, [dotCount, lineCount]);

  useEffect(() => {
    if (meshRef.current) {
      const dummy = new THREE.Object3D();
      points.forEach((p, i) => {
        dummy.position.copy(p);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [points]);

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, dotCount]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshBasicMaterial color="#3AA89B" transparent opacity={0.8} />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#3AA89B" transparent opacity={isMobile ? 0.25 : 0.5} />
      </lineSegments>
    </group>
  );
}

// Scene component to rotate slowly
function NetworkScene({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
    }
  });

  const mainConnections = useMemo(() => {
    const lns = [];
    const probability = isMobile ? 0.75 : 0.6; // Less connections on mobile for performance
    for (let i = 0; i < NODES.length; i++) {
      for (let j = i + 1; j < NODES.length; j++) {
        if (Math.random() > probability) {
          lns.push(...NODES[i].position, ...NODES[j].position);
        }
      }
    }
    return new Float32Array(lns);
  }, [isMobile]);

  return (
    <group ref={groupRef} scale={0.75}>
      <BackgroundDots isMobile={isMobile} />

      {/* Main connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={mainConnections.length / 3}
            args={[mainConnections, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#3AA89B" transparent opacity={isMobile ? 0.4 : 0.8} />
      </lineSegments>

      {/* Main Nodes */}
      {NODES.map((node) => (
        <group key={node.id} position={new THREE.Vector3(...node.position)}>
          <mesh>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshBasicMaterial color="#3AA89B" />
          </mesh>
          <Html center sprite distanceFactor={7.5} zIndexRange={[100, 0]}>
            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-full shadow-lg border border-gray-200 whitespace-nowrap" style={{ pointerEvents: 'none' }}>
              {node.icon === '👻' || node.icon === '⚛️' ? (
                <span className="text-xl leading-none">{node.icon}</span>
              ) : (
                <div
                  className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold shadow-sm"
                  style={{ backgroundColor: node.color }}
                >
                  {node.icon}
                </div>
              )}
              <span className="text-black font-bold text-[13px] tracking-tight">{node.label}</span>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

export default function Network3D({ isMobile = false, isActive }: { isMobile?: boolean, isActive?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });
  
  // If isActive is explicitly passed (e.g. pinned desktop sections), use it. Otherwise rely on native scroll visibility.
  const shouldRender = isActive !== undefined ? isActive : isInView;

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing select-none [&>div]:!overflow-visible">
      <Canvas frameloop={shouldRender ? 'always' : 'demand'} camera={{ position: [0, 0, 11], fov: 45 }} style={{ overflow: 'visible' }} dpr={isMobile ? 1 : [1, 1.5]} performance={{ min: 0.5 }}>
        <OrbitControls enableZoom={false} enablePan={false} />
        <NetworkScene isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
