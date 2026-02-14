"use client";

import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useMemo, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

type SocialIcon = {
  key: string;
  Icon: LucideIcon;
  color: string;
  orbitRadius: number;
  verticalOffset: number;
};

const socialIcons: SocialIcon[] = [
  {
    key: "instagram",
    Icon: Instagram,
    color: "#D62976",
    orbitRadius: 1.95,
    verticalOffset: 0.32,
  },
  {
    key: "linkedin",
    Icon: Linkedin,
    color: "#0A66C2",
    orbitRadius: 1.82,
    verticalOffset: -0.35,
  },
  {
    key: "facebook",
    Icon: Facebook,
    color: "#1877F2",
    orbitRadius: 2.02,
    verticalOffset: 0.26,
  },
  {
    key: "youtube",
    Icon: Youtube,
    color: "#FF0033",
    orbitRadius: 1.86,
    verticalOffset: -0.28,
  },
];

function seededUnit(seed: number) {
  const value = Math.sin(seed * 91.3458) * 47453.5453;
  return value - Math.floor(value);
}

function createStarField(count: number) {
  const values: number[] = [];

  for (let i = 0; i < count; i += 1) {
    const radius = 2.8 + seededUnit(i * 1.37 + 1.1) * 1.45;
    const theta = seededUnit(i * 2.11 + 2.8) * Math.PI * 2;
    const phi = Math.acos(2 * seededUnit(i * 3.41 + 4.2) - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
    const z = radius * Math.cos(phi);
    values.push(x, y, z);
  }

  return new Float32Array(values);
}

const STAR_FIELD = createStarField(220);

function OrbitingSocialScene() {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const orbitARef = useRef<THREE.Group>(null);
  const orbitBRef = useRef<THREE.Group>(null);

  const orbitAIcons = useMemo(() => socialIcons.filter((_, index) => index % 2 === 0), []);
  const orbitBIcons = useMemo(() => socialIcons.filter((_, index) => index % 2 === 1), []);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.24;
      coreRef.current.rotation.y += delta * 0.4;
    }

    if (shellRef.current) {
      shellRef.current.rotation.x -= delta * 0.17;
      shellRef.current.rotation.y += delta * 0.2;
      shellRef.current.rotation.z += delta * 0.15;
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.y -= delta * 0.16;
      ringsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.28;
    }

    if (orbitARef.current) {
      orbitARef.current.rotation.y += delta * 0.58;
      orbitARef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.55) * 0.18;
    }

    if (orbitBRef.current) {
      orbitBRef.current.rotation.y -= delta * 0.45;
      orbitBRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.14;
    }
  });

  return (
    <>
      <ambientLight intensity={0.72} />
      <directionalLight position={[2.8, 2.1, 2.4]} intensity={0.95} />
      <pointLight position={[-2.3, -1.1, 1.7]} intensity={0.38} color="#4ED1B2" />
      <pointLight position={[1.8, -1.6, -1.8]} intensity={0.25} color="#E6D8B8" />

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[STAR_FIELD, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#4ED1B2" size={0.013} transparent opacity={0.38} depthWrite={false} />
      </points>

      <group scale={0.76}>
        <mesh ref={coreRef}>
          <torusKnotGeometry args={[0.64, 0.18, 220, 28]} />
          <meshPhysicalMaterial
            color="#0B1715"
            metalness={0.64}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.08}
            emissive="#4ED1B2"
            emissiveIntensity={0.17}
          />
        </mesh>

        <mesh ref={shellRef} scale={1.17}>
          <icosahedronGeometry args={[0.98, 2]} />
          <meshBasicMaterial color="#4ED1B2" wireframe transparent opacity={0.24} />
        </mesh>

        <group ref={ringsRef}>
          <mesh rotation={[Math.PI / 2, 0.25, 0]}>
            <torusGeometry args={[1.45, 0.012, 16, 160]} />
            <meshStandardMaterial color="#E6D8B8" emissive="#E6D8B8" emissiveIntensity={0.07} />
          </mesh>
          <mesh rotation={[0.45, 0, 0.82]}>
            <torusGeometry args={[1.72, 0.01, 16, 180]} />
            <meshStandardMaterial color="#4ED1B2" emissive="#4ED1B2" emissiveIntensity={0.14} />
          </mesh>
        </group>

        <group ref={orbitARef} rotation={[0.52, 0.2, 0]}>
          {orbitAIcons.map(({ key, Icon, color, orbitRadius, verticalOffset }, index) => {
            const angle = (Math.PI * 2 * index) / orbitAIcons.length;
            const x = Math.cos(angle) * orbitRadius;
            const z = Math.sin(angle) * orbitRadius;

            return (
              <group key={key} position={[x, verticalOffset, z]}>
                <Html transform sprite distanceFactor={5.4}>
                  <div
                    className={cn(
                      "pointer-events-none flex size-8 items-center justify-center rounded-full",
                      "border border-white/35 bg-white/85 text-[#0F1F1E] shadow-[0_8px_20px_rgba(8,15,14,0.24)]"
                    )}
                    style={{ color }}
                    aria-hidden="true"
                  >
                    <Icon className="size-4" strokeWidth={2.2} />
                  </div>
                </Html>
              </group>
            );
          })}
        </group>

        <group ref={orbitBRef} rotation={[-0.46, 0, 0.7]}>
          {orbitBIcons.map(({ key, Icon, color, orbitRadius, verticalOffset }, index) => {
            const angle = (Math.PI * 2 * index) / orbitBIcons.length + Math.PI / 3;
            const x = Math.cos(angle) * orbitRadius;
            const z = Math.sin(angle) * orbitRadius;

            return (
              <group key={key} position={[x, verticalOffset, z]}>
                <Html transform sprite distanceFactor={5.4}>
                  <div
                    className={cn(
                      "pointer-events-none flex size-8 items-center justify-center rounded-full",
                      "border border-white/35 bg-white/85 text-[#0F1F1E] shadow-[0_8px_20px_rgba(8,15,14,0.24)]"
                    )}
                    style={{ color }}
                    aria-hidden="true"
                  >
                    <Icon className="size-4" strokeWidth={2.2} />
                  </div>
                </Html>
              </group>
            );
          })}
        </group>
      </group>
    </>
  );
}

export default function SocialOrbitShape() {
  return (
    <div className="h-full w-full">
      <Canvas
        className="pointer-events-none"
        camera={{ position: [0, 0.12, 4.95], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <OrbitingSocialScene />
      </Canvas>
    </div>
  );
}
