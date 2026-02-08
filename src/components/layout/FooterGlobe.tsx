"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

const GLOBE_RADIUS = 1.55;
const ICON_OFFSET = 0.06;

type SocialKey = "instagram" | "x" | "linkedin" | "youtube";

type SocialMarker = {
  key: SocialKey;
  color: string;
  lat: number;
  lon: number;
};

const DEG = Math.PI / 180;

const SOCIAL_MARKERS: SocialMarker[] = [
  { key: "instagram", color: "#E4405F", lat: 24, lon: 22 },
  { key: "x", color: "#0F172A", lat: 8, lon: 124 },
  { key: "linkedin", color: "#0A66C2", lat: -16, lon: 70 },
  { key: "youtube", color: "#FF0000", lat: 20, lon: -98 },
];

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawIcon(ctx: CanvasRenderingContext2D, key: SocialKey, color: string) {
  const size = 256;

  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.translate(size / 2, size / 2);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (key === "instagram") {
    ctx.lineWidth = 12;
    roundedRect(ctx, -44, -44, 88, 88, 24);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(30, -30, 7, 0, Math.PI * 2);
    ctx.fill();
  }

  if (key === "x") {
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-34, -40);
    ctx.lineTo(34, 40);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(34, -40);
    ctx.lineTo(-34, 40);
    ctx.stroke();
  }

  if (key === "linkedin") {
    ctx.font = "700 78px Inter, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("in", 8, 8);
  }

  if (key === "youtube") {
    ctx.lineWidth = 10;
    roundedRect(ctx, -52, -34, 104, 68, 20);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-10, -16);
    ctx.lineTo(24, 0);
    ctx.lineTo(-10, 16);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

function createIconTexture(key: SocialKey, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  drawIcon(context, key, color);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

function longitudeDelta(a: number, b: number) {
  const delta = Math.abs(a - b) % 360;
  return delta > 180 ? 360 - delta : delta;
}

function continentMask(lat: number, lon: number) {
  const gaussian = (latC: number, lonC: number, latR: number, lonR: number, weight: number) => {
    const dLat = (lat - latC) / latR;
    const dLon = longitudeDelta(lon, lonC) / lonR;
    return Math.exp(-(dLat * dLat + dLon * dLon) * 1.28) * weight;
  };

  let score = 0;
  score += gaussian(42, 85, 25, 55, 1.08);
  score += gaussian(24, 78, 11, 19, 0.79);
  score += gaussian(50, 20, 14, 21, 0.74);
  score += gaussian(10, 22, 38, 26, 1.0);
  score += gaussian(36, -102, 21, 34, 0.84);
  score += gaussian(-17, -62, 24, 21, 0.75);
  score += gaussian(-26, 136, 10, 17, 0.56);
  return score > 0.44;
}

function createPointCloud(targetCount = 7600) {
  const points: number[] = [];

  outer: for (let lat = -66; lat <= 80; lat += 1.35) {
    for (let lon = -180; lon < 180; lon += 1.35) {
      if (points.length / 3 >= targetCount) {
        break outer;
      }

      if (!continentMask(lat, lon)) {
        continue;
      }

      const latRad = lat * DEG;
      const lonRad = lon * DEG;
      const cosLat = Math.cos(latRad);

      points.push(cosLat * Math.cos(lonRad), Math.sin(latRad), cosLat * Math.sin(lonRad));
    }
  }

  return new Float32Array(points);
}

const POINTS = createPointCloud();

function latLonToVector(lat: number, lon: number, radius: number) {
  const latRad = lat * DEG;
  const lonRad = lon * DEG;
  const cosLat = Math.cos(latRad);

  return new THREE.Vector3(radius * cosLat * Math.cos(lonRad), radius * Math.sin(latRad), radius * cosLat * Math.sin(lonRad));
}

function FooterGlobeScene() {
  const pointGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(POINTS, 3));
    return geometry;
  }, []);

  const iconTextures = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const textures: Partial<Record<SocialKey, THREE.CanvasTexture>> = {};

    for (const marker of SOCIAL_MARKERS) {
      const texture = createIconTexture(marker.key, marker.color);
      if (texture) {
        textures[marker.key] = texture;
      }
    }

    return textures as Record<SocialKey, THREE.CanvasTexture>;
  }, []);

  useEffect(() => {
    return () => {
      pointGeometry.dispose();
      Object.values(iconTextures ?? {}).forEach((texture) => texture?.dispose());
    };
  }, [iconTextures, pointGeometry]);

  return (
    <>
      <ambientLight intensity={0.72} />
      <hemisphereLight args={["#ffffff", "#e4e8ef", 0.4]} />
      <directionalLight position={[1.3, 1.1, 2.4]} intensity={0.24} />
      <directionalLight position={[-1.2, -0.3, -2.0]} intensity={0.11} />

      <group position={[0, GLOBE_RADIUS * -0.55, 0]}>
        <mesh>
          <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
          <meshStandardMaterial color="#f3f5f8" roughness={1} metalness={0} transparent opacity={0.3} />
        </mesh>

        <points geometry={pointGeometry}>
          <pointsMaterial color="#61656d" size={0.018} sizeAttenuation transparent opacity={0.98} depthWrite={false} />
        </points>

        {iconTextures &&
          SOCIAL_MARKERS.map((marker) => (
            <sprite
              key={marker.key}
              position={latLonToVector(marker.lat, marker.lon, GLOBE_RADIUS + ICON_OFFSET)}
              scale={[0.34, 0.34, 0.34]}
            >
              <spriteMaterial map={iconTextures[marker.key]} transparent opacity={1} depthWrite={false} depthTest toneMapped={false} />
            </sprite>
          ))}
      </group>

      <OrbitControls
        target={[0, GLOBE_RADIUS * -0.55, 0]}
        enableRotate
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.2}
        enableDamping
        dampingFactor={0.1}
      />
    </>
  );
}

export default function FooterGlobe() {
  return (
    <Canvas camera={{ position: [0, 0, 3.25], fov: 35 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
      <FooterGlobeScene />
    </Canvas>
  );
}
