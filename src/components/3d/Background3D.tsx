import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';

function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesGeometryRef = useRef<THREE.BufferGeometry>(null);
  const linesMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  const pointsMaterialRef = useRef<THREE.PointsMaterial>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const pointCount = 250;
  const originalPositions = useMemo(() => {
    return random.inSphere(new Float32Array(pointCount * 3), { radius: 3 }) as Float32Array;
  }, []);

  const positions = useMemo(() => new Float32Array(originalPositions), [originalPositions]);

  const indices = useMemo(() => {
    const indicesArray = [];
    const maxDistance = 0.85;
    for (let i = 0; i < pointCount; i++) {
      for (let j = i + 1; j < pointCount; j++) {
        const dx = originalPositions[i * 3] - originalPositions[j * 3];
        const dy = originalPositions[i * 3 + 1] - originalPositions[j * 3 + 1];
        const dz = originalPositions[i * 3 + 2] - originalPositions[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < maxDistance * maxDistance) {
          indicesArray.push(i, j);
        }
      }
    }
    return new Uint16Array(indicesArray);
  }, [originalPositions]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Smooth mouse interpolation
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * delta * 4;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * delta * 4;

    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;
      
      // Parallax effect
      groupRef.current.position.x = mouseX * 0.3;
      groupRef.current.position.y = mouseY * 0.3;
    }

    // Animate points (slow pulsing, floating, and mouse reaction)
    if (pointsRef.current && linesGeometryRef.current) {
      const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < pointCount; i++) {
        const i3 = i * 3;
        const origX = originalPositions[i3];
        const origY = originalPositions[i3 + 1];
        const origZ = originalPositions[i3 + 2];
        
        // Calculate distance to mouse (mapped roughly to 3D space)
        const dx = origX - mouseX * 4;
        const dy = origY - mouseY * 4;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        
        // Mouse repulsion effect
        const interaction = Math.max(0, 1.2 - distToMouse) * 0.15;
        
        // Slow floating wave
        const wave = Math.sin(time * 0.8 + origX * 2) * 0.05 + Math.cos(time * 0.6 + origY * 2) * 0.05;
        
        posArray[i3] = origX + Math.sin(time * 0.5 + origY) * 0.05 + (dx * interaction);
        posArray[i3 + 1] = origY + Math.cos(time * 0.6 + origZ) * 0.05 + (dy * interaction);
        posArray[i3 + 2] = origZ + wave;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      linesGeometryRef.current.attributes.position.needsUpdate = true;
    }

    // Dynamic pulsing effect for materials
    if (pointsMaterialRef.current) {
      pointsMaterialRef.current.size = 0.03 + Math.sin(time * 2) * 0.01;
      pointsMaterialRef.current.opacity = 0.6 + Math.sin(time * 1.5) * 0.3;
    }

    if (linesMaterialRef.current) {
      linesMaterialRef.current.opacity = 0.15 + Math.sin(time * 1.2) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={pointsMaterialRef}
          transparent
          color="#10b981"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments>
        <bufferGeometry ref={linesGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            count={indices.length}
            array={indices}
            itemSize={1}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={linesMaterialRef}
          color="#059669"
          transparent
          opacity={0.15}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export function Background3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
        <fog attach="fog" args={['#0a0b0b', 2, 5]} />
        <NetworkNodes />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-bg/80 to-brand-bg pointer-events-none" />
    </div>
  );
}
