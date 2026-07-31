"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// Define the nodes based on the screenshot
const NODES = [
  { id: 'openai', label: 'OpenAI', position: [-2.5, 1.5, 0], color: '#000000', icon: 'OpenAI' },
  { id: 'make', label: 'make', position: [-0.8, 2, -1], color: '#7E3AF2', icon: 'M' },
  { id: 'lemlist', label: 'lemlist', position: [2, 1.8, -0.5], color: '#2563EB', icon: 'E' },
  { id: 'pipedrive', label: 'pipedrive', position: [-0.5, 0.6, 1], color: '#16A34A', icon: 'P' },
  { id: 'n8n', label: 'n8n', position: [1.5, 0.3, 0], color: '#EF4444', icon: 'n8n' },
  { id: 'perplexity', label: 'perplexity', position: [0.8, -0.6, 1.5], color: '#000000', icon: 'X' },
  { id: 'voiceflow', label: 'Voiceflow', position: [0.2, -1.5, 1], color: '#000000', icon: 'V' },
  { id: 'phantom', label: 'phantom', position: [2.5, -1.2, -1], color: '#000000', icon: '👻' },
  { id: 'clay', label: 'clay', position: [-1.5, -2, 0], color: '#000000', icon: 'C' },
];

// Helper to generate lots of background dots
function BackgroundDots() {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 150; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 7
        )
      );
    }
    return pts;
  }, []);

  const lines = useMemo(() => {
    const lns = [];
    for (let i = 0; i < 80; i++) {
      const p1 = points[Math.floor(Math.random() * points.length)];
      let p2 = points[Math.floor(Math.random() * points.length)];
      while (p1.distanceTo(p2) > 3) {
        p2 = points[Math.floor(Math.random() * points.length)];
      }
      lns.push([p1, p2]);
    }
    return lns;
  }, [points]);

  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#3AA89B" transparent opacity={0.8} />
        </mesh>
      ))}
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([line[0].x, line[0].y, line[0].z, line[1].x, line[1].y, line[1].z])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#3AA89B" transparent opacity={0.5} />
        </line>
      ))}
    </group>
  );
}

// Scene component to rotate slowly
function NetworkScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
    }
  });

  const mainConnections = useMemo(() => {
    const lns = [];
    for (let i = 0; i < NODES.length; i++) {
      for (let j = i + 1; j < NODES.length; j++) {
        if (Math.random() > 0.6) {
          lns.push([NODES[i].position, NODES[j].position]);
        }
      }
    }
    return lns;
  }, []);

  return (
    <group ref={groupRef} scale={0.75}>
      <BackgroundDots />
      
      {/* Main connections */}
      {mainConnections.map((line, i) => (
        <line key={`conn-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...line[0], ...line[1]])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#3AA89B" transparent opacity={0.8} />
        </line>
      ))}

      {/* Main Nodes */}
      {NODES.map((node) => (
        <group key={node.id} position={new THREE.Vector3(...node.position)}>
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#3AA89B" />
          </mesh>
          <Html center distanceFactor={6} zIndexRange={[100, 0]}>
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2 py-1 rounded-full shadow-lg border border-white/40 whitespace-nowrap" style={{ pointerEvents: 'none' }}>
              {node.icon === '👻' ? (
                <span className="text-lg leading-none">👻</span>
              ) : (
                <div 
                  className="w-4 h-4 rounded flex items-center justify-center text-white text-[8px] font-bold shadow-sm"
                  style={{ backgroundColor: node.color }}
                >
                  {node.icon}
                </div>
              )}
              <span className="text-black font-bold text-xs tracking-tight">{node.label}</span>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

export default function Network3D() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 11], fov: 45 }}>
        <OrbitControls enableZoom={false} enablePan={false} />
        <NetworkScene />
      </Canvas>
    </div>
  );
}
