"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function rand01(index: number, seed: number) {
  const x = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453123;
  return x - Math.floor(x);
}

function OrbitalCore() {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);

  const haloPositions = useMemo(() => {
    const count = 220;
    const values = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      const radius = 1.9 + rand01(i, 1) * 0.9;
      const theta = rand01(i, 2) * Math.PI * 2;
      const phi = rand01(i, 3) * Math.PI;

      values[i3] = radius * Math.sin(phi) * Math.cos(theta);
      values[i3 + 1] = radius * Math.cos(phi);
      values[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    return values;
  }, []);

  useFrame((state, delta) => {
    const root = groupRef.current;
    if (!root) return;

    const targetX = state.pointer.y * 0.28;
    const targetY = state.pointer.x * 0.62;
    root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, targetX, 0.08);
    root.rotation.y = THREE.MathUtils.lerp(root.rotation.y, targetY, 0.08);
    root.position.x = THREE.MathUtils.lerp(root.position.x, state.pointer.x * 0.36, 0.07);
    root.position.y = THREE.MathUtils.lerp(root.position.y, state.pointer.y * 0.24, 0.07);

    if (shellRef.current) {
      shellRef.current.rotation.y += delta * 0.18;
      shellRef.current.rotation.x += delta * 0.08;
    }

    if (ringARef.current) {
      ringARef.current.rotation.x += delta * 0.32;
      ringARef.current.rotation.y -= delta * 0.18;
    }

    if (ringBRef.current) {
      ringBRef.current.rotation.z -= delta * 0.28;
      ringBRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.04, 2]} />
        <meshStandardMaterial
          color="#4ED1B2"
          emissive="#0C3D31"
          emissiveIntensity={0.7}
          roughness={0.26}
          metalness={0.38}
          transparent
          opacity={0.52}
        />
      </mesh>

      <mesh ref={ringARef} rotation={[Math.PI / 3.2, 0, 0]}>
        <torusGeometry args={[1.6, 0.025, 22, 140]} />
        <meshStandardMaterial color="#E6D8B8" emissive="#7A6A43" emissiveIntensity={0.28} roughness={0.44} />
      </mesh>

      <mesh ref={ringBRef} rotation={[0, Math.PI / 3, Math.PI / 2.5]}>
        <torusGeometry args={[1.95, 0.018, 20, 160]} />
        <meshStandardMaterial color="#8AF3DE" emissive="#1D8C72" emissiveIntensity={0.42} roughness={0.36} />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[haloPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#EAFEF8" transparent opacity={0.74} />
      </points>
    </group>
  );
}

export default function AboutOrbScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.9], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.58} />
      <pointLight position={[2.4, 1.8, 2.9]} intensity={1.2} color="#4ED1B2" />
      <pointLight position={[-2.1, -1.1, 2.1]} intensity={0.84} color="#E6D8B8" />
      <directionalLight position={[0, 3, 2]} intensity={0.36} color="#FFFFFF" />
      <OrbitalCore />
    </Canvas>
  );
}
