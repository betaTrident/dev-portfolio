"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { techGlobeItems } from "@/data/tech-globe-items";
import { cn } from "@/lib/utils";
import {
  useGlobeInteraction,
  fibonacciSphere,
  projectNode,
  type ProjectedNode,
} from "@/hooks/use-globe-interaction";

// ─── Constants ────────────────────────────────────────────────────────────────
const GLOBE_RADIUS = 1.55;
const GLOBE_PX = 520; // canvas size in CSS pixels
const ACCENT = 0xc47a55;

// ─── Three.js scene builder (runs once) ──────────────────────────────────────
function buildScene(canvas: HTMLCanvasElement, W: number, H: number) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 100);
  camera.position.z = 4.0;

  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  // — Inner dark sphere (occludes nodes behind globe) —
  const innerGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.985, 48, 48);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x1b2436,
    transparent: true,
    opacity: 0.22,
  });
  globeGroup.add(new THREE.Mesh(innerGeo, innerMat));

  // — Geodesic wireframe (IcosahedronGeometry for triangulated look) —
  const wireGeo = new THREE.IcosahedronGeometry(GLOBE_RADIUS, 4);
  const wireMat = new THREE.MeshBasicMaterial({
    color: ACCENT,
    wireframe: true,
    transparent: true,
    opacity: 0.18,
  });
  const wireMesh = new THREE.Mesh(wireGeo, wireMat);
  globeGroup.add(wireMesh);

  // Back-side wire layer adds subtle interior visibility through the translucent globe.
  const innerWireMat = new THREE.MeshBasicMaterial({
    color: ACCENT,
    wireframe: true,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.11,
  });
  globeGroup.add(new THREE.Mesh(wireGeo, innerWireMat));

  const unitPositions = fibonacciSphere(techGlobeItems.length);
  const localPositions = unitPositions.map(
    (u) => new THREE.Vector3(u.x * GLOBE_RADIUS, u.y * GLOBE_RADIUS, u.z * GLOBE_RADIUS)
  );

  return { renderer, scene, camera, globeGroup, wireMat, localPositions };
}

// ─── Icon Node Layer ──────────────────────────────────────────────────────────
interface NodeState extends ProjectedNode {
  index: number;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function TechNodeLayer({
  nodes,
}: {
  nodes: NodeState[];
}) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {nodes.map(({ index, x, y, depth, isBehind }) => {
        const item = techGlobeItems[index];
        // Smoothly fade nodes out as they rotate to the back side.
        const visibility = smoothstep(0.42, 0.62, depth);
        const scale = 0.6 + visibility * 0.5;
        const opacity = visibility;
        // z-index for stacking order
        const zIndex = Math.round(depth * 100);

        return (
          <div
            key={item.id}
            className="absolute flex flex-col items-center gap-2"
            style={{
              // Centre the node on the projected point
              left: 0,
              top: 0,
              transform: `translate(${x - 28}px, ${y - 28}px) scale(${scale})`,
              opacity,
              zIndex,
              pointerEvents: visibility < 0.08 || isBehind ? "none" : "auto",
              willChange: "transform, opacity",
              // Prevent transition jitter — animation runs frame-by-frame
              transition: "none",
            }}
          >
            {/* Icon */}
            <div
              className="relative w-14 h-14 flex items-center justify-center
                         rounded-lg cursor-pointer group/node"
              title={item.name}
            >
              {item.iconUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={item.iconUrl}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain drop-shadow-sm
                             transition-all duration-200
                             group-hover/node:scale-110
                             group-hover/node:drop-shadow-[0_0_10px_var(--node-color)]"
                  style={
                    { "--node-color": item.color } as React.CSSProperties
                  }
                  loading="lazy"
                />
              ) : (
                /* Fallback: coloured badge with initials */
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center
                              text-[11px] font-black tracking-wide"
                  style={{
                    background: `${item.color}22`,
                    border: `1.5px solid ${item.color}66`,
                    color: item.color,
                  }}
                >
                  {item.short}
                </div>
              )}
            </div>

            {/* Label */}
            <span
              className="font-mono text-[11px] font-semibold tracking-wider
                         uppercase text-on-surface/70 whitespace-nowrap
                         leading-none"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
            >
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Canvas Component ────────────────────────────────────────────────────
export function SkillsGlobeCanvas({
  sizePx = GLOBE_PX,
  className,
}: {
  sizePx?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const sceneRef = useRef<ReturnType<typeof buildScene> | null>(null);
  const [nodes, setNodes] = useState<NodeState[]>([]);
  const rafRef = useRef<number>(0);

  // Interaction hook
  const { tick: interactionTick, attachTo } = useGlobeInteraction(
    globeGroupRef,
    {
      inertia: 0.92,
      autoSpinSpeed: 0.0025,
      autoSpinResumeDelay: 2200,
    }
  );

  // Project all nodes to 2D — called every animation frame
  const updateNodes = useCallback(() => {
    const s = sceneRef.current;
    if (!s) return;
    const W = s.renderer.domElement.clientWidth;
    const H = s.renderer.domElement.clientHeight;

    const projected = s.localPositions.map((localPos, index) => ({
      index,
      ...projectNode(
        localPos,
        s.globeGroup.rotation,
        s.camera,
        W,
        H,
        GLOBE_RADIUS
      ),
    }));

    setNodes(projected);
  }, []);

  // Build scene on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    const built = buildScene(canvas, W, H);
    sceneRef.current = built;
    globeGroupRef.current = built.globeGroup;

    // Attach drag interaction
    const cleanup = attachTo(canvas);

    // Animate cursor style
    canvas.style.cursor = "grab";
    const onDown = () => { canvas.style.cursor = "grabbing"; };
    const onUp = () => { canvas.style.cursor = "grab"; };
    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    let pulse = 0;

    // Render loop
    function loop() {
      const s = sceneRef.current;
      if (!s) return;

      // Interaction tick (inertia + auto-spin)
      interactionTick();

      // Subtle wireframe pulse
      pulse += 0.012;
      built.wireMat.opacity = 0.16 + Math.sin(pulse) * 0.025;

      updateNodes();
      s.renderer.render(s.scene, s.camera);
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      cleanup();
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      built.renderer.dispose();
      sceneRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const s = sceneRef.current;
        if (s) {
          s.renderer.setSize(width, height);
          s.camera.aspect = width / height;
          s.camera.updateProjectionMatrix();
        }
      }
    });

    ro.observe(canvas.parentElement ?? canvas);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      className={cn("relative mx-auto", className)}
      style={{ width: sizePx, height: sizePx, maxWidth: "100%" }}
    >
      {/* Three.js WebGL canvas */}
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
        aria-label="Interactive 3D tech stack globe — drag to rotate"
      />

      {/* HTML icon overlay (projected onto globe surface) */}
      <TechNodeLayer nodes={nodes} />
    </div>
  );
}
