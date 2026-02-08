"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";

const GLOBE_RADIUS = 1.0;
const GLOBE_CENTER_Y = -0.84;

type DotCloud = {
  oceanDots: Float32Array;
  landDots: Float32Array;
};

type LatLonPoint = {
  lat: number;
  lon: number;
};

type LandPolygon = {
  points: LatLonPoint[];
};

const LAND_POLYGONS: LandPolygon[] = [
  {
    // North America
    points: [
      { lat: 72, lon: -166 }, { lat: 70, lon: -150 }, { lat: 66, lon: -136 }, { lat: 61, lon: -126 },
      { lat: 55, lon: -124 }, { lat: 50, lon: -127 }, { lat: 45, lon: -124 }, { lat: 37, lon: -122 },
      { lat: 32, lon: -116 }, { lat: 25, lon: -112 }, { lat: 23, lon: -106 }, { lat: 24, lon: -98 },
      { lat: 27, lon: -90 }, { lat: 31, lon: -83 }, { lat: 36, lon: -78 }, { lat: 43, lon: -66 },
      { lat: 50, lon: -60 }, { lat: 56, lon: -66 }, { lat: 62, lon: -74 }, { lat: 67, lon: -90 },
      { lat: 71, lon: -112 }, { lat: 72, lon: -138 },
    ],
  },
  {
    // South America
    points: [
      { lat: 12, lon: -81 }, { lat: 8, lon: -78 }, { lat: 3, lon: -77 }, { lat: -3, lon: -78 },
      { lat: -10, lon: -79 }, { lat: -16, lon: -76 }, { lat: -23, lon: -73 }, { lat: -31, lon: -71 },
      { lat: -39, lon: -73 }, { lat: -47, lon: -70 }, { lat: -54, lon: -66 }, { lat: -52, lon: -58 },
      { lat: -45, lon: -50 }, { lat: -36, lon: -46 }, { lat: -26, lon: -44 }, { lat: -14, lon: -41 },
      { lat: -2, lon: -46 }, { lat: 4, lon: -52 }, { lat: 9, lon: -61 }, { lat: 12, lon: -74 },
    ],
  },
  {
    // Europe
    points: [
      { lat: 36, lon: -10 }, { lat: 43, lon: -6 }, { lat: 48, lon: 0 }, { lat: 54, lon: 7 },
      { lat: 58, lon: 15 }, { lat: 62, lon: 24 }, { lat: 66, lon: 34 }, { lat: 64, lon: 44 },
      { lat: 58, lon: 40 }, { lat: 54, lon: 28 }, { lat: 49, lon: 20 }, { lat: 45, lon: 14 },
      { lat: 41, lon: 9 }, { lat: 37, lon: 2 },
    ],
  },
  {
    // Africa
    points: [
      { lat: 37, lon: -17 }, { lat: 34, lon: -7 }, { lat: 32, lon: 4 }, { lat: 31, lon: 14 },
      { lat: 30, lon: 25 }, { lat: 22, lon: 35 }, { lat: 12, lon: 44 }, { lat: 3, lon: 50 },
      { lat: -8, lon: 45 }, { lat: -18, lon: 40 }, { lat: -28, lon: 33 }, { lat: -35, lon: 20 },
      { lat: -34, lon: 10 }, { lat: -28, lon: 3 }, { lat: -20, lon: -4 }, { lat: -8, lon: -10 },
      { lat: 3, lon: -14 }, { lat: 14, lon: -17 }, { lat: 24, lon: -16 }, { lat: 32, lon: -12 },
    ],
  },
  {
    // Asia main
    points: [
      { lat: 42, lon: 40 }, { lat: 48, lon: 58 }, { lat: 54, lon: 75 }, { lat: 59, lon: 95 },
      { lat: 58, lon: 118 }, { lat: 54, lon: 136 }, { lat: 50, lon: 150 }, { lat: 43, lon: 144 },
      { lat: 35, lon: 136 }, { lat: 27, lon: 125 }, { lat: 20, lon: 117 }, { lat: 14, lon: 106 },
      { lat: 10, lon: 95 }, { lat: 15, lon: 84 }, { lat: 22, lon: 74 }, { lat: 30, lon: 66 },
      { lat: 37, lon: 55 },
    ],
  },
  {
    // India / Arabia bridge
    points: [
      { lat: 30, lon: 45 }, { lat: 27, lon: 53 }, { lat: 23, lon: 60 }, { lat: 19, lon: 67 },
      { lat: 13, lon: 74 }, { lat: 8, lon: 77 }, { lat: 11, lon: 82 }, { lat: 18, lon: 88 },
      { lat: 24, lon: 82 }, { lat: 29, lon: 72 }, { lat: 30, lon: 60 },
    ],
  },
  {
    // Australia
    points: [
      { lat: -10, lon: 113 }, { lat: -16, lon: 122 }, { lat: -23, lon: 133 }, { lat: -31, lon: 143 },
      { lat: -39, lon: 151 }, { lat: -44, lon: 142 }, { lat: -42, lon: 130 }, { lat: -36, lon: 120 },
      { lat: -28, lon: 114 }, { lat: -18, lon: 112 },
    ],
  },
  {
    // Greenland
    points: [
      { lat: 83, lon: -72 }, { lat: 80, lon: -60 }, { lat: 76, lon: -46 }, { lat: 72, lon: -34 },
      { lat: 67, lon: -28 }, { lat: 63, lon: -38 }, { lat: 66, lon: -52 }, { lat: 72, lon: -64 },
    ],
  },
  {
    // Antarctica
    points: [
      { lat: -72, lon: -180 }, { lat: -76, lon: -140 }, { lat: -79, lon: -90 }, { lat: -80, lon: -40 },
      { lat: -78, lon: 20 }, { lat: -80, lon: 80 }, { lat: -77, lon: 135 }, { lat: -72, lon: 180 },
      { lat: -90, lon: 180 }, { lat: -90, lon: -180 },
    ],
  },
];

function normalizeLongitude(lon: number) {
  let value = lon;
  while (value > 180) value -= 360;
  while (value < -180) value += 360;
  return value;
}

function unwrapPolygon(points: LatLonPoint[], lon: number) {
  const target = normalizeLongitude(lon);
  const unwrapped: LatLonPoint[] = [];
  let previous = normalizeLongitude(points[0].lon);
  let offset = 0;
  unwrapped.push({ lat: points[0].lat, lon: previous });

  for (let i = 1; i < points.length; i += 1) {
    let current = normalizeLongitude(points[i].lon);
    const diff = current - previous;
    if (diff > 180) offset -= 360;
    if (diff < -180) offset += 360;
    current += offset;
    unwrapped.push({ lat: points[i].lat, lon: current });
    previous = current;
  }

  const options = [target, target + 360, target - 360];
  let bestTarget = options[0];
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const option of options) {
    const distance = Math.min(...unwrapped.map((p) => Math.abs(p.lon - option)));
    if (distance < bestDistance) {
      bestDistance = distance;
      bestTarget = option;
    }
  }

  return { points: unwrapped, targetLon: bestTarget };
}

function isPointInPolygon(lat: number, lon: number, polygon: LandPolygon) {
  const { points, targetLon } = unwrapPolygon(polygon.points, lon);

  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i].lon;
    const yi = points[i].lat;
    const xj = points[j].lon;
    const yj = points[j].lat;

    const intersects =
      yi > lat !== yj > lat && targetLon < ((xj - xi) * (lat - yi)) / (yj - yi + 1e-9) + xi;
    if (intersects) inside = !inside;
  }

  return inside;
}

function isLandPoint(lat: number, lon: number) {
  return LAND_POLYGONS.some((polygon) => isPointInPolygon(lat, lon, polygon));
}

function createEarthDotCloud(pointCount = 14000): DotCloud {
  const oceanBuffer: number[] = [];
  const landBuffer: number[] = [];

  for (let i = 0; i < pointCount; i += 1) {
    const y = 1 - (i / (pointCount - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = Math.PI * (3 - Math.sqrt(5)) * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    const lat = Math.asin(y) * (180 / Math.PI);
    const lon = Math.atan2(z, x) * (180 / Math.PI);

    if (isLandPoint(lat, lon)) {
      landBuffer.push(x, y, z);
    } else {
      oceanBuffer.push(x, y, z);
    }
  }

  return {
    oceanDots: new Float32Array(oceanBuffer),
    landDots: new Float32Array(landBuffer),
  };
}

const DOTS = createEarthDotCloud();

function FooterGlobeScene() {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const geometries = useMemo(() => {
    const createGeometry = (source: Float32Array) => {
      const geometry = new THREE.BufferGeometry();
      const scaled = new Float32Array(source.length);

      for (let i = 0; i < source.length; i += 3) {
        scaled[i] = source[i] * GLOBE_RADIUS;
        scaled[i + 1] = source[i + 1] * GLOBE_RADIUS;
        scaled[i + 2] = source[i + 2] * GLOBE_RADIUS;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(scaled, 3));
      return geometry;
    };

    return {
      ocean: createGeometry(DOTS.oceanDots),
      land: createGeometry(DOTS.landDots),
    };
  }, []);

  useEffect(() => {
    const controls = controlsRef.current;
    if (controls) {
      const distance = controls.object.position.distanceTo(controls.target);
      controls.minDistance = distance;
      controls.maxDistance = distance;
      controls.update();
    }

    return () => {
      geometries.ocean.dispose();
      geometries.land.dispose();
    };
  }, [geometries]);

  return (
    <>
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#ffffff", "#e9edf3", 0.28]} />
      <directionalLight position={[1.2, 1.1, 2.2]} intensity={0.18} />

      <group position={[0, GLOBE_CENTER_Y, 0]} rotation={[0.04, 0.2, 0]}>
        <points geometry={geometries.ocean}>
          <pointsMaterial color="#C1C9D5" size={0.0085} sizeAttenuation transparent opacity={0.14} depthWrite={false} />
        </points>
        <points geometry={geometries.land}>
          <pointsMaterial color="#53607A" size={0.019} sizeAttenuation transparent opacity={0.99} depthWrite={false} />
        </points>
      </group>

      <OrbitControls
        ref={controlsRef}
        target={[0, GLOBE_CENTER_Y, 0]}
        enableRotate
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.2}
        enableDamping
        dampingFactor={0.09}
      />
    </>
  );
}

export default function FooterGlobe() {
  return (
    <Canvas camera={{ position: [0, 0, 3.55], fov: 36 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
      <FooterGlobeScene />
    </Canvas>
  );
}
