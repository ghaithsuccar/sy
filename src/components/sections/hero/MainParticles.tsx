"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";

export function MainParticles() {
  const COUNT = 520;
  const { resolvedTheme } = useTheme();
  const isLightTheme = resolvedTheme !== "dark";

  const pointsRef = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array>(new Float32Array(COUNT * 3));

  const raycasterRef = useRef(new THREE.Raycaster());
  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const hitRef = useRef(new THREE.Vector3());

  const pointerTargetNdcRef = useRef(new THREE.Vector2(0, 0));
  const pointerSmoothNdcRef = useRef(new THREE.Vector2(0, 0));
  const mouseWorldRef = useRef(new THREE.Vector2(0, 0));
  const centerRef = useRef(new THREE.Vector2(0, 0));

  const pointerInsideRef = useRef(false);

  const { camera, gl } = useThree();

  useEffect(() => {
    const dom = gl.domElement;

    const updatePointerNdc = (clientX: number, clientY: number) => {
      const rect = dom.getBoundingClientRect();
      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      pointerInsideRef.current = inside;

      if (!inside) return;

      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((clientY - rect.top) / rect.height) * 2 + 1;

      pointerTargetNdcRef.current.set(
        THREE.MathUtils.clamp(x, -1, 1),
        THREE.MathUtils.clamp(y, -1, 1)
      );
    };

    const onPointerMove = (event: PointerEvent) => {
      updatePointerNdc(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      updatePointerNdc(touch.clientX, touch.clientY);
    };

    const onWindowBlur = () => {
      pointerInsideRef.current = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("blur", onWindowBlur);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [gl]);

  const rand01 = (index: number, seed: number) => {
    const x = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };

  const { positions, origins, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const origins = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const tmpColor = new THREE.Color();

    const minR = 0.35;
    const maxR = 6.2;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      const r1 = rand01(i, 1);
      const r2 = rand01(i, 2);
      const r3 = rand01(i, 3);
      const r4 = rand01(i, 4);
      const r5 = rand01(i, 5);

      const angle = r1 * Math.PI * 2;
      const radius = minR + (r2 ** 0.58) * (maxR - minR);

      const x = Math.cos(angle) * radius + (r3 - 0.5) * 0.14;
      const y = Math.sin(angle) * radius + (r4 - 0.5) * 0.14;
      const z = (r5 - 0.5) * 0.6;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      origins[i3] = x;
      origins[i3 + 1] = y;
      origins[i3 + 2] = z;

      const t = angle / (Math.PI * 2);
      const hue = THREE.MathUtils.euclideanModulo(0.74 - t * 0.98 + r3 * 0.08, 1);
      const sat = 1;
      const light = isLightTheme
        ? THREE.MathUtils.lerp(0.42, 0.62, Math.min(1, radius / maxR))
        : THREE.MathUtils.lerp(0.66, 0.8, Math.min(1, radius / maxR));
      tmpColor.setHSL(hue, sat, light);

      colors[i3] = tmpColor.r;
      colors[i3 + 1] = tmpColor.g;
      colors[i3 + 2] = tmpColor.b;
    }

    return { positions, origins, colors };
  }, [isLightTheme]);

  useFrame((state, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const dt = Math.min(delta, 1 / 60);

    const ndcLerp = 1 - Math.exp(-14 * dt);
    pointerSmoothNdcRef.current.x = THREE.MathUtils.lerp(
      pointerSmoothNdcRef.current.x,
      pointerTargetNdcRef.current.x,
      ndcLerp
    );
    pointerSmoothNdcRef.current.y = THREE.MathUtils.lerp(
      pointerSmoothNdcRef.current.y,
      pointerTargetNdcRef.current.y,
      ndcLerp
    );

    raycasterRef.current.setFromCamera(pointerSmoothNdcRef.current, camera);
    if (raycasterRef.current.ray.intersectPlane(planeRef.current, hitRef.current)) {
      mouseWorldRef.current.x = hitRef.current.x;
      mouseWorldRef.current.y = hitRef.current.y;
    }

    if (!pointerInsideRef.current) {
      const settle = 1 - Math.exp(-2.2 * dt);
      mouseWorldRef.current.x = THREE.MathUtils.lerp(mouseWorldRef.current.x, 0, settle);
      mouseWorldRef.current.y = THREE.MathUtils.lerp(mouseWorldRef.current.y, 0, settle);
    }

    const centerLerp = 1 - Math.exp(-6.2 * dt);
    centerRef.current.x = THREE.MathUtils.lerp(centerRef.current.x, mouseWorldRef.current.x, centerLerp);
    centerRef.current.y = THREE.MathUtils.lerp(centerRef.current.y, mouseWorldRef.current.y, centerLerp);

    const mx = mouseWorldRef.current.x;
    const my = mouseWorldRef.current.y;
    const cx = centerRef.current.x;
    const cy = centerRef.current.y;
    const time = state.clock.getElapsedTime();

    const influenceRadius = 1.7;
    const influenceRadius2 = influenceRadius * influenceRadius;

    const kReturn = 2.6;
    const kMouse = 5.6;
    const kZ = 2.9;
    const damping = 4.2;
    const maxSpeed = 1.65;

    const driftAmp = 0.16;
    const driftFreq = 0.72;

    const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;
    const vel = velocitiesRef.current;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      const px = pos[i3];
      const py = pos[i3 + 1];
      const pz = pos[i3 + 2];

      const ox = origins[i3] + cx;
      const oy = origins[i3 + 1] + cy;
      const oz = origins[i3 + 2];

      let vx = vel[i3];
      let vy = vel[i3 + 1];
      let vz = vel[i3 + 2];

      let ax = (ox - px) * kReturn;
      let ay = (oy - py) * kReturn;
      const az = (oz - pz) * kZ;

      const dx = px - mx;
      const dy = py - my;
      const d2 = dx * dx + dy * dy;

      if (d2 < influenceRadius2) {
        const d = Math.sqrt(d2) + 1e-6;
        const t = 1 - d / influenceRadius;
        const falloff = t * t * (3 - 2 * t);

        const nx = dx / d;
        const ny = dy / d;

        const repel = kMouse * falloff;
        const swirl = kMouse * 0.42 * falloff;

        ax += nx * repel + -ny * swirl;
        ay += ny * repel + nx * swirl;
      }

      const phase = i * 0.012;
      ax += Math.sin(time * driftFreq + phase) * driftAmp;
      ay += Math.cos(time * driftFreq + phase * 1.5) * driftAmp;

      vx += (ax - damping * vx) * dt;
      vy += (ay - damping * vy) * dt;
      vz += (az - damping * vz) * dt;

      const speed = Math.hypot(vx, vy, vz);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        vz *= scale;
      }

      pos[i3] += vx * dt * 60;
      pos[i3 + 1] += vy * dt * 60;
      pos[i3 + 2] += vz * dt * 60;

      vel[i3] = vx;
      vel[i3 + 1] = vy;
      vel[i3 + 2] = vz;
    }

    // Keep subtle, always-on motion even without pointer interaction.
    pts.rotation.z = Math.sin(time * 0.2) * 0.03;
    pts.rotation.x = Math.cos(time * 0.16) * 0.015;

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        transparent
        opacity={0.86}
        vertexColors
        depthWrite={false}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}
