"use client";

import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Antigravity-style particles:
 * - cluster is CENTERED ON THE MOUSE (so it follows across the hero)
 * - smooth mouse target (no jitter)
 * - local influence + return spring (stable, not shaky)
 * - bigger points for visibility
 * - vertexColors gradient like the reference
 */
export function MainParticles() {
    const COUNT = 2400;

    const pointsRef = useRef<THREE.Points>(null);

    const raycasterRef = useRef(new THREE.Raycaster());
    const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)); // z=0 plane
    const hitRef = useRef(new THREE.Vector3());

    // Smoothed mouse target
    const mouseSmoothRef = useRef(new THREE.Vector2(0, 0));

    // Smoothed "cluster center" that follows the mouse (slightly laggy = premium feel)
    const centerRef = useRef(new THREE.Vector2(0, 0));

    const { camera } = useThree();

    const { positions, origins, velocities, colors } = useMemo(() => {
        const positions = new Float32Array(COUNT * 3);
        const origins = new Float32Array(COUNT * 3);
        const velocities = new Float32Array(COUNT * 3);
        const colors = new Float32Array(COUNT * 3);

        // Build a burst around (0,0) first — we’ll offset it each frame by the moving center
        const maxR = 8.5;
        const minR = 0.7;

        const tmpColor = new THREE.Color();

        for (let i = 0; i < COUNT; i++) {
            const i3 = i * 3;

            // Fan burst: -105..105 degrees
            const a = THREE.MathUtils.degToRad(
                THREE.MathUtils.lerp(-105, 105, Math.random())
            );

            // Dense near center, sparser outward
            const r = minR + (Math.random() ** 0.6) * (maxR - minR);

            // Initial around (0,0)
            const x = Math.cos(a) * r + (Math.random() - 0.5) * 0.25;
            const y = Math.sin(a) * r + (Math.random() - 0.5) * 0.25;
            const z = (Math.random() - 0.5) * 0.6;

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;

            origins[i3] = x;
            origins[i3 + 1] = y;
            origins[i3 + 2] = z;

            velocities[i3] = 0;
            velocities[i3 + 1] = 0;
            velocities[i3 + 2] = 0;

            // Angle -> hue gradient (blue/purple -> red/orange/yellow)
            const t = (a + THREE.MathUtils.degToRad(105)) / THREE.MathUtils.degToRad(210);
            const hue = THREE.MathUtils.lerp(0.60, 0.12, t);
            const sat = 0.9;
            const light = THREE.MathUtils.lerp(0.56, 0.62, Math.min(1, r / maxR));

            tmpColor.setHSL(hue, sat, light);
            colors[i3] = tmpColor.r;
            colors[i3 + 1] = tmpColor.g;
            colors[i3 + 2] = tmpColor.b;
        }

        return { positions, origins, velocities, colors };
    }, []);

    useFrame((state, delta) => {
        const pts = pointsRef.current;
        if (!pts) return;

        const dt = Math.min(delta, 1 / 60);

        // Pointer -> world (z=0 plane)
        raycasterRef.current.setFromCamera(state.pointer, camera);
        raycasterRef.current.ray.intersectPlane(planeRef.current, hitRef.current);

        // Smooth the pointer itself
        const mouseLerp = 1 - Math.exp(-12 * dt);
        mouseSmoothRef.current.x = THREE.MathUtils.lerp(
            mouseSmoothRef.current.x,
            hitRef.current.x,
            mouseLerp
        );
        mouseSmoothRef.current.y = THREE.MathUtils.lerp(
            mouseSmoothRef.current.y,
            hitRef.current.y,
            mouseLerp
        );

        // Smooth the cluster center to follow mouse across the hero section
        // (Feels like inertia / antigravity)
        const centerLerp = 1 - Math.exp(-4.5 * dt); // smaller = more laggy
        centerRef.current.x = THREE.MathUtils.lerp(
            centerRef.current.x,
            mouseSmoothRef.current.x,
            centerLerp
        );
        centerRef.current.y = THREE.MathUtils.lerp(
            centerRef.current.y,
            mouseSmoothRef.current.y,
            centerLerp
        );

        const mx = mouseSmoothRef.current.x;
        const my = mouseSmoothRef.current.y;

        const cx = centerRef.current.x;
        const cy = centerRef.current.y;

        const time = state.clock.getElapsedTime();

        // ===== Feel knobs =====
        const influenceRadius = 2.3;
        const influenceRadius2 = influenceRadius * influenceRadius;

        const kReturn = 2.4; // back-to-origin (to moving center)
        const kMouse = 4.8;  // local mouse repel/swirl
        const kZ = 3.0;

        const c = 4.0;       // damping
        const maxSpeed = 1.4;

        const driftAmp = 0.16;
        const driftFreq = 0.45;

        const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute;
        const pos = posAttr.array as Float32Array;

        for (let i = 0; i < COUNT; i++) {
            const i3 = i * 3;

            const px = pos[i3];
            const py = pos[i3 + 1];
            const pz = pos[i3 + 2];

            // IMPORTANT: origin is relative; we offset it by the moving center
            const ox = origins[i3] + cx;
            const oy = origins[i3 + 1] + cy;
            const oz = origins[i3 + 2];

            let vx = velocities[i3];
            let vy = velocities[i3 + 1];
            let vz = velocities[i3 + 2];

            // Return-to-origin (but origin moves with center)
            let ax = (ox - px) * kReturn;
            let ay = (oy - py) * kReturn;
            let az = (oz - pz) * kZ;

            // Local mouse influence (repel + slight swirl)
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
                const swirl = kMouse * 0.32 * falloff;

                ax += nx * repel + -ny * swirl;
                ay += ny * repel + nx * swirl;
            }

            // Ambient drift (super subtle)
            const phase = i * 0.013;
            ax += Math.sin(time * driftFreq + phase) * driftAmp;
            ay += Math.cos(time * driftFreq + phase * 1.6) * driftAmp;

            // Integrate with damping
            vx += (ax - c * vx) * dt;
            vy += (ay - c * vy) * dt;
            vz += (az - c * vz) * dt;

            // Clamp speed
            const sp = Math.hypot(vx, vy, vz);
            if (sp > maxSpeed) {
                const s = maxSpeed / sp;
                vx *= s;
                vy *= s;
                vz *= s;
            }

            // Integrate position
            pos[i3] += vx * dt * 60;
            pos[i3 + 1] += vy * dt * 60;
            pos[i3 + 2] += vz * dt * 60;

            velocities[i3] = vx;
            velocities[i3 + 1] = vy;
            velocities[i3 + 2] = vz;
        }

        posAttr.needsUpdate = true;
    });

    return (
        <points ref={pointsRef} frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>

            <pointsMaterial
                size={0.09}          // ✅ bigger for visibility
                transparent
                opacity={0.95}       // ✅ slightly more visible
                vertexColors
                depthWrite={false}
                sizeAttenuation
            />
        </points>
    );
}
