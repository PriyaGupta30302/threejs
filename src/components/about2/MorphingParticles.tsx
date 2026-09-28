'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
// @ts-expect-error: OBJLoader types missing
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { globalScrollState } from './scrollState';
import { MathUtils } from 'three';
import { extractTrianglesFromObject, sampleTriangles } from './geometryUtils';

const vertexShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform float uIsTechHovered;
  uniform float uIsMobile;
  uniform vec2 uMouse;
  
  attribute vec3 aBrainPos;
  attribute vec3 aBrainNormal;
  attribute vec3 aBulbPos;
  attribute vec3 aBulbNormal;
  attribute vec3 aCirclePos;
  attribute vec3 aCircleNormal;
  attribute vec3 aGalaxyPos;
  
  attribute float aSize;
  attribute float aRandom;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vRandom;

  // Simple 3D noise function
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  
  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 1.0/7.0; 
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z); 
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ ); 
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
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vRandom = aRandom;
    
    // --- MORPHING LOGIC BASED ON uProgress (6 Sections, so 0.2 intervals) ---
    // 0.0 - 0.20: Brain (Hero to About)
    // 0.20 - 0.40: Brain -> Galaxy (About to Gap)
    // 0.40 - 0.60: Galaxy -> Bulb (Gap to Experience)
    // 0.60 - 0.80: Bulb -> Galaxy 2 -> Circle (Experience to Toolkit)
    // 0.80 - 1.00: Circle (Toolkit to CTA)
    
    // Brain to Galaxy (Shatter): Very slow shatter at Center (0.30 to 0.40)
    float shatterBrain = smoothstep(0.30, 0.40, uProgress);
    // Galaxy to Bulb (Assemble): Assemble completely by the time it hits Experience (0.45 to 0.55)
    float assembleBulb = smoothstep(0.45, 0.55, uProgress);
    
    // Bulb to Galaxy 2 (Shatter): Happens while moving to Center (0.70 to 0.80)
    float shatterBulb = smoothstep(0.70, 0.80, uProgress);
    // Galaxy 2 to Circle (Assemble): Happens at Center (0.80 to 0.90)
    float assembleCircle = smoothstep(0.80, 0.90, uProgress);

    // Apply turbulence during galaxy phase to make it dynamic
    float galaxyMotion = uTime * 0.2;
    vec3 animatedGalaxy = aGalaxyPos + vec3(
       snoise(aGalaxyPos * 0.5 + galaxyMotion),
       snoise(aGalaxyPos * 0.5 + galaxyMotion + 10.0),
       snoise(aGalaxyPos * 0.5 + galaxyMotion + 20.0)
    ) * (1.0 + aRandom * 2.0);

    // Initial state is Brain
    vec3 currentPos = aBrainPos;
    vec3 currentNormal = aBrainNormal;
    
    // Morph Brain -> Galaxy
    currentPos = mix(currentPos, animatedGalaxy, shatterBrain);
    currentNormal = mix(currentNormal, vec3(0.0, 1.0, 0.0), shatterBrain);
    
    // Morph Galaxy -> Bulb
    currentPos = mix(currentPos, aBulbPos, assembleBulb);
    currentNormal = mix(currentNormal, aBulbNormal, assembleBulb);
    
    // Morph Bulb -> Galaxy
    currentPos = mix(currentPos, animatedGalaxy, shatterBulb);
    currentNormal = mix(currentNormal, vec3(0.0, 1.0, 0.0), shatterBulb);
    
    // Morph Galaxy -> Circle
    currentPos = mix(currentPos, aCirclePos, assembleCircle);
    currentNormal = mix(currentNormal, aCircleNormal, assembleCircle);

    // Store base position for motion
    vec3 baseMorphPos = currentPos;
    
    // Tech hover effect (explode slightly and speed up noise)
    float hoverEffect = mix(1.0, 1.2 + aRandom * 0.2, uIsTechHovered);
    float time = uTime * 0.3;
    
    // Smooth fluid motion 
    float fluidX = sin(baseMorphPos.y * 3.0 + time) * cos(baseMorphPos.z * 2.0 + time * 0.8);
    float fluidY = cos(baseMorphPos.x * 3.0 + time * 1.1) * sin(baseMorphPos.z * 2.0 + time * 0.9);
    float fluidZ = sin(baseMorphPos.x * 3.0 + time * 1.2) * cos(baseMorphPos.y * 2.0 + time);
    
    float motionIntensity = 0.002;
    currentPos += vec3(fluidX, fluidY, fluidZ) * motionIntensity * hoverEffect;
    
    // --- ORGANIC 3D MOUSE DISPLACEMENT ---
    vec4 projectedForMouse = projectionMatrix * modelViewMatrix * vec4(baseMorphPos, 1.0);
    vec2 screenPos = projectedForMouse.xy / projectedForMouse.w;
    
    float dist = distance(screenPos, uMouse);
    float fieldNoise = snoise(baseMorphPos * 2.0 + vec3(time * 0.3)) * 0.5 + 0.5;
    float baseRadius = uIsMobile > 0.5 ? 0.7 : 0.55;
    float organicRadius = baseRadius * (0.4 + 0.6 * fieldNoise) * (0.6 + 0.8 * aRandom);
    float influence = smoothstep(0.0, 1.0, 1.0 - smoothstep(0.0, organicRadius, dist));
    vec2 pushDir2D = normalize(screenPos - uMouse + vec2(0.0001)); 
    float scatterX = snoise(baseMorphPos * 3.0 + vec3(time * 0.4));
    float scatterY = snoise(baseMorphPos * 3.0 - vec3(time * 0.4));
    float scatterZ = snoise(baseMorphPos * 2.0 + vec3(time * 0.2)); 
    vec3 scatterVec = vec3(scatterX, scatterY, scatterZ);
    vec3 finalPushDir = normalize(vec3(pushDir2D, 0.0) + scatterVec * (0.5 + 0.5 * aRandom));
    float maxPush = 1.0; 
    float particleStrength = 0.4 + 0.6 * aRandom;
    float structureMask = smoothstep(0.95, 0.85, aRandom);
    
    currentPos += finalPushDir * influence * maxPush * particleStrength * structureMask;
    
    // Colors matching the Brain (Purple, Gold, Cyan) for all shapes!
    vec3 colorGold = vec3(1.0, 0.8, 0.2);
    vec3 colorPurple = vec3(0.6, 0.2, 0.9);
    vec3 colorCyan = vec3(0.1, 0.8, 0.9);
    vec3 colorWhite = vec3(1.0, 1.0, 1.0);
    
    float colorNoise = snoise(baseMorphPos * 0.15 + time * 0.02); 
    
    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    vec3 viewDir = normalize(-mvPosition.xyz);
    
    float facingCamera = dot(currentNormal, viewDir);
    float rimFactor = 1.0 - smoothstep(0.0, 0.8, facingCamera);
    
    vec3 baseCol = mix(colorPurple, colorGold, rimFactor);
    baseCol = mix(baseCol, colorCyan, smoothstep(-1.5, 0.0, baseMorphPos.y) * 0.5);
    baseCol *= 2.5;
    
    if (aRandom > 0.8) {
        float randColor = fract(aRandom * 45.123 + baseMorphPos.x * 0.1 + baseMorphPos.y * 0.2);
        if (randColor < 0.33) {
            baseCol = colorPurple * 1.5;
        } else if (randColor < 0.66) {
            baseCol = colorCyan * 1.5;
        } else {
            baseCol = colorGold * 1.5;
        }
    }
    
    vec3 mainLightDir = normalize(vec3(1.0, 1.5, 2.0));
    float mainDiffuse = max(0.0, dot(currentNormal, mainLightDir));
    vec3 fillLightDir = normalize(vec3(-1.0, -1.0, 1.0));
    float fillDiffuse = max(0.0, dot(currentNormal, fillLightDir)) * 0.6; 
    float diffuse = clamp(mainDiffuse + fillDiffuse, 0.0, 1.0) * 0.8 + 0.2;
    baseCol = mix(baseCol, vec3(1.0), fillDiffuse * 0.4);
    
    vec3 halfDir = normalize(mainLightDir + viewDir);
    float specAngle = max(dot(halfDir, currentNormal), 0.0);
    float specular = pow(specAngle, 16.0) * 0.8;

    vColor = mix(baseCol * diffuse + specular, colorWhite, smoothstep(0.3, 0.8, colorNoise));
    vColor = mix(vColor, vec3(0.2, 0.9, 0.9), uIsTechHovered * 0.4);
    
    if (aRandom < 0.8) {
        vAlpha = mix(0.8, 1.0, aRandom);
    } else {
        vAlpha = mix(0.8, 1.0, aRandom); 
    }
    
    gl_Position = projectionMatrix * mvPosition;
    
    float depthFog = smoothstep(-12.0, 0.0, mvPosition.z);
    vColor *= mix(0.1, 1.5, depthFog); 
    
    float baseSize = mix(8.0, 22.0, aSize);
    baseSize *= mix(0.8, 1.2, rimFactor); 
    
    if (aRandom > 0.8) {
        baseSize *= 1.2; 
    }
    
    float pulse = sin(uTime * (1.5 + aRandom) + aRandom * 6.28) * 0.3 + 0.7; 
    float perspective = 1.0 / max(3.0, -mvPosition.z);
    
    // Scale up slightly during galaxy phase to emphasize the scatter
    float galaxyEmphasis = sin(shatterBrain * 3.14159) * 0.5 + sin(shatterBulb * 3.14159) * 0.5;
    baseSize *= (1.0 + galaxyEmphasis * 2.5); // Thicker 'mote' particles

    gl_PointSize = baseSize * perspective * hoverEffect * pulse;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vRandom;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    
    // Triangle shape
    float a = atan(uv.x, uv.y) + 3.14159;
    float r = 3.14159 * 2.0 / 3.0;
    float d = cos(floor(0.5 + a/r) * r - a) * length(uv);
    
    float size = 0.35;
    float thickness = 0.06;
    
    float alpha = 1.0 - smoothstep(size - 0.015, size + 0.015, d);
    
    if (alpha < 0.05 || vAlpha < 0.05) discard;
    
    gl_FragColor = vec4(vColor, alpha * vAlpha);
  }
`;

interface MorphingParticlesProps {
  activeTech: string | null;
  isMobile?: boolean;
}

export default function MorphingParticles({ activeTech, isMobile = false }: MorphingParticlesProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const brainGltf = useGLTF('/Rotten Brain.glb');
  
  // Use OBJLoader inside a custom loader setup since useLoader might be tricky with imports directly here
  // Actually standard useLoader(OBJLoader, url) works
  const bulbObj = useLoader(OBJLoader, '/Light Bulb/Light Bulb.obj');
  
  const geometryData = useMemo(() => {
    const structureCount = isMobile ? 50000 : 150000;
    const bgCount = isMobile ? 2000 : 5000;
    const count = structureCount + bgCount;
    
    // Extract Brain Triangles
    const brainTriangles = extractTrianglesFromObject(brainGltf.scene);
    // Extract Bulb Triangles (filter out studio/backdrop)
    const bulbTriangles = extractTrianglesFromObject(bulbObj, 'Light_Bulb');
    
    // Sample Brain
    // Scale 5.5, Rotation Y = Math.PI/4 to face the right side
    const brainSamples = sampleTriangles(brainTriangles, structureCount, 5.3, { x: -0.1, y: Math.PI/4, z: 0 });
    
    // Sample Bulb
    // Reduce Bulb scale to 5.0 (from 6.5) to fit the screen better
    // Z rotation is the left/right tilt.
    const bulbSamples = sampleTriangles(bulbTriangles, structureCount, 5.0, { x: 0.1, y: 0, z: 0.5 }, new THREE.Vector3(0, -0.2, 0));
    
    const aBrainPos = new Float32Array(count * 3);
    const aBrainNormal = new Float32Array(count * 3);
    
    const aBulbPos = new Float32Array(count * 3);
    const aBulbNormal = new Float32Array(count * 3);
    
    const aCirclePos = new Float32Array(count * 3);
    const aCircleNormal = new Float32Array(count * 3);
    
    const aGalaxyPos = new Float32Array(count * 3);
    
    const aSize = new Float32Array(count);
    const aRandom = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const isStructure = i < structureCount;
      // Brain
      if (isStructure) {
          aBrainPos[i3] = brainSamples[i].p.x;
          aBrainPos[i3+1] = brainSamples[i].p.y;
          aBrainPos[i3+2] = brainSamples[i].p.z;
          aBrainNormal[i3] = brainSamples[i].n.x;
          aBrainNormal[i3+1] = brainSamples[i].n.y;
          aBrainNormal[i3+2] = brainSamples[i].n.z;
      }
      
      // Bulb
      if (isStructure) {
          aBulbPos[i3] = bulbSamples[i].p.x;
          aBulbPos[i3+1] = bulbSamples[i].p.y;
          aBulbPos[i3+2] = bulbSamples[i].p.z;
          aBulbNormal[i3] = bulbSamples[i].n.x;
          aBulbNormal[i3+1] = bulbSamples[i].n.y;
          aBulbNormal[i3+2] = bulbSamples[i].n.z;
      }
      
      // Circle
      if (isStructure) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const snx = Math.sin(phi) * Math.cos(theta);
        const sny = Math.cos(phi);
        const snz = Math.sin(phi) * Math.sin(theta);
        let rSphere = 2.4; 
        if (Math.random() < 0.6) rSphere *= Math.pow(Math.random(), 1.0 / 3.0);
        aCirclePos[i3] = snx * rSphere;
        aCirclePos[i3+1] = sny * rSphere;
        aCirclePos[i3+2] = snz * rSphere;
        aCircleNormal[i3] = snx;
        aCircleNormal[i3+1] = sny;
        aCircleNormal[i3+2] = snz;
      }
      
      // Galaxy (Milky Way filling the visible screen)
      const gRadius = 2.0 + Math.random() * 14.0;
      const gTheta = Math.random() * Math.PI * 2;
      const gSpiral = gTheta + gRadius * 0.5; // Spiral effect
      const gHeight = (Math.random() - 0.5) * 18.0; // Fill screen height
      
      aGalaxyPos[i3] = Math.cos(gSpiral) * gRadius;
      aGalaxyPos[i3+1] = gHeight;
      aGalaxyPos[i3+2] = Math.sin(gSpiral) * gRadius;
      
      // If it's a background scatter particle (not structure)
      if (!isStructure) {
        const bgRadius = 15.0 + Math.random() * 10.0;
        const bgTheta = Math.random() * Math.PI * 2;
        const bgY = (Math.random() - 0.5) * 20.0;
        
        const bX = Math.cos(bgTheta) * bgRadius;
        const bZ = Math.sin(bgTheta) * bgRadius;
        
        aBrainPos[i3] = bX; aBrainPos[i3+1] = bgY; aBrainPos[i3+2] = bZ;
        aBulbPos[i3] = bX; aBulbPos[i3+1] = bgY; aBulbPos[i3+2] = bZ;
        aCirclePos[i3] = bX; aCirclePos[i3+1] = bgY; aCirclePos[i3+2] = bZ;
        
        aBrainNormal[i3] = 0; aBrainNormal[i3+1] = 0; aBrainNormal[i3+2] = 1;
        aBulbNormal[i3] = 0; aBulbNormal[i3+1] = 0; aBulbNormal[i3+2] = 1;
        aCircleNormal[i3] = 0; aCircleNormal[i3+1] = 0; aCircleNormal[i3+2] = 1;
        
        aRandom[i] = 0.85 + Math.random() * 0.15;
      } else {
        aRandom[i] = Math.random() * 0.7; // < 0.8 means solid
      }
      
      aSize[i] = Math.random();
    }
    
    return { aBrainPos, aBrainNormal, aBulbPos, aBulbNormal, aCirclePos, aCircleNormal, aGalaxyPos, aSize, aRandom };
  }, [brainGltf, bulbObj, isMobile]);

  const hoveredValue = useRef(0);
  const smoothedMouse = useRef(new THREE.Vector2(-999, -999));
  const hasMoved = useRef(false);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uIsMobile.value = isMobile ? 1.0 : 0.0;
      
      const currentProg = materialRef.current.uniforms.uProgress.value;
      const targetProg = globalScrollState.progress;
      materialRef.current.uniforms.uProgress.value = MathUtils.lerp(currentProg, targetProg, 0.02);
      
      if (state.pointer.x !== 0 || state.pointer.y !== 0) {
          if (!hasMoved.current) smoothedMouse.current.copy(state.pointer);
          hasMoved.current = true;
      }
      
      if (hasMoved.current) smoothedMouse.current.lerp(state.pointer, 0.12);
      materialRef.current.uniforms.uMouse.value.copy(smoothedMouse.current);
      
      const targetHover = activeTech ? 1.0 : 0.0;
      hoveredValue.current = MathUtils.lerp(hoveredValue.current, targetHover, 0.1);
      materialRef.current.uniforms.uIsTechHovered.value = hoveredValue.current;
    }
  });

  return (
    <points>
      <bufferGeometry key={isMobile ? 'mobile' : 'desktop'}>
        <bufferAttribute attach="attributes-position" args={[geometryData.aBrainPos, 3]} />
        <bufferAttribute attach="attributes-aBrainPos" args={[geometryData.aBrainPos, 3]} />
        <bufferAttribute attach="attributes-aBrainNormal" args={[geometryData.aBrainNormal, 3]} />
        <bufferAttribute attach="attributes-aBulbPos" args={[geometryData.aBulbPos, 3]} />
        <bufferAttribute attach="attributes-aBulbNormal" args={[geometryData.aBulbNormal, 3]} />
        <bufferAttribute attach="attributes-aCirclePos" args={[geometryData.aCirclePos, 3]} />
        <bufferAttribute attach="attributes-aCircleNormal" args={[geometryData.aCircleNormal, 3]} />
        <bufferAttribute attach="attributes-aGalaxyPos" args={[geometryData.aGalaxyPos, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[geometryData.aSize, 1]} />
        <bufferAttribute attach="attributes-aRandom" args={[geometryData.aRandom, 1]} />
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
        depthWrite={true}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
