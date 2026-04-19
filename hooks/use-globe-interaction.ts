"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

export interface GlobeInteractionState {
  rotationRef: React.MutableRefObject<THREE.Euler>;
  isDraggingRef: React.MutableRefObject<boolean>;
}

interface UseGlobeInteractionOptions {
  /** Velocity decay per frame (0–1). Higher = more inertia. */
  inertia?: number;
  /** Auto-spin speed in radians/frame when idle. */
  autoSpinSpeed?: number;
  /** Milliseconds of idle before auto-spin resumes. */
  autoSpinResumeDelay?: number;
  /** Maximum vertical tilt in radians. */
  maxPolarAngle?: number;
}

export function useGlobeInteraction(
  groupRef: React.RefObject<THREE.Group | null>,
  options: UseGlobeInteractionOptions = {}
) {
  const {
    inertia = 0.92,
    autoSpinSpeed = 0.0025,
    autoSpinResumeDelay = 2200,
    maxPolarAngle = Math.PI / 2.1,
  } = options;

  const isDraggingRef = useRef(false);
  const velRef = useRef({ x: 0, y: 0 });
  const prevRef = useRef({ x: 0, y: 0 });
  const autoSpinRef = useRef(true);
  const spinTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ----- pointer helpers -----
  const startDrag = useCallback((x: number, y: number) => {
    isDraggingRef.current = true;
    prevRef.current = { x, y };
    velRef.current = { x: 0, y: 0 };
    autoSpinRef.current = false;
    if (spinTimerRef.current) clearTimeout(spinTimerRef.current);
  }, []);

  const moveDrag = useCallback((x: number, y: number) => {
    if (!isDraggingRef.current) return;
    const dx = x - prevRef.current.x;
    const dy = y - prevRef.current.y;
    velRef.current.y = dx * 0.004;
    velRef.current.x = dy * 0.004;
    prevRef.current = { x, y };

    if (groupRef.current) {
      groupRef.current.rotation.y += velRef.current.y;
      groupRef.current.rotation.x = Math.max(
        -maxPolarAngle,
        Math.min(maxPolarAngle, groupRef.current.rotation.x + velRef.current.x)
      );
    }
  }, [groupRef, maxPolarAngle]);

  const endDrag = useCallback(() => {
    isDraggingRef.current = false;
    spinTimerRef.current = setTimeout(() => {
      autoSpinRef.current = true;
    }, autoSpinResumeDelay);
  }, [autoSpinResumeDelay]);

  // ----- per-frame tick (called from render loop) -----
  const tick = useCallback(() => {
    if (!groupRef.current) return;
    if (isDraggingRef.current) return;

    // apply inertia
    velRef.current.x *= inertia;
    velRef.current.y *= inertia;

    groupRef.current.rotation.x = Math.max(
      -maxPolarAngle,
      Math.min(maxPolarAngle, groupRef.current.rotation.x + velRef.current.x)
    );
    groupRef.current.rotation.y += velRef.current.y;

    // auto-spin
    if (autoSpinRef.current) {
      groupRef.current.rotation.y += autoSpinSpeed;
    }
  }, [groupRef, inertia, autoSpinSpeed, maxPolarAngle]);

  // ----- attach events to a canvas element -----
  const attachTo = useCallback(
    (canvas: HTMLCanvasElement) => {
      canvasRef.current = canvas;

      const onMouseDown = (e: MouseEvent) => startDrag(e.clientX, e.clientY);
      const onMouseMove = (e: MouseEvent) => moveDrag(e.clientX, e.clientY);
      const onMouseUp = () => endDrag();

      const onTouchStart = (e: TouchEvent) => {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      };
      const onTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        moveDrag(e.touches[0].clientX, e.touches[0].clientY);
      };
      const onTouchEnd = () => endDrag();

      canvas.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      canvas.addEventListener("touchstart", onTouchStart, { passive: true });
      canvas.addEventListener("touchmove", onTouchMove, { passive: false });
      canvas.addEventListener("touchend", onTouchEnd);

      return () => {
        canvas.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        canvas.removeEventListener("touchstart", onTouchStart);
        canvas.removeEventListener("touchmove", onTouchMove);
        canvas.removeEventListener("touchend", onTouchEnd);
        if (spinTimerRef.current) clearTimeout(spinTimerRef.current);
      };
    },
    [startDrag, moveDrag, endDrag]
  );

  return { tick, attachTo, isDraggingRef };
}

// ─── Fibonacci Sphere Distribution ──────────────────────────────────────────
/** Returns N unit vectors evenly distributed on a sphere surface (no pole clustering). */
export function fibonacciSphere(n: number): THREE.Vector3[] {
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    return new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius);
  });
}

// ─── 3D → 2D Projection ─────────────────────────────────────────────────────
const _v3 = new THREE.Vector3();

export interface ProjectedNode {
  /** Canvas-space x in pixels */
  x: number;
  /** Canvas-space y in pixels */
  y: number;
  /** 0 = back of sphere, 1 = front of sphere */
  depth: number;
  /** true when behind the sphere's midplane */
  isBehind: boolean;
}

export function projectNode(
  localPos: THREE.Vector3,
  groupRotation: THREE.Euler,
  camera: THREE.Camera,
  canvasWidth: number,
  canvasHeight: number,
  sphereRadius: number
): ProjectedNode {
  _v3.copy(localPos).applyEuler(groupRotation);

  const projected = _v3.clone().project(camera);
  const x = (projected.x * 0.5 + 0.5) * canvasWidth;
  const y = (-projected.y * 0.5 + 0.5) * canvasHeight;

  const depth = (_v3.z + sphereRadius) / (2 * sphereRadius); // 0–1
  const isBehind = _v3.z < -sphereRadius * 0.05;

  return { x, y, depth, isBehind };
}
