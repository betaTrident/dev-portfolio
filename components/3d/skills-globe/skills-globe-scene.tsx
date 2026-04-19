"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import type { Group } from "three";
import type { TechGlobeItem } from "@/types/tech-globe";
import { techGlobeItems } from "@/data/tech-globe-items";

function fibonacciPoint(index: number, total: number, radius: number) {
  const offset = 2 / total;
  const increment = Math.PI * (3 - Math.sqrt(5));
  const y = index * offset - 1 + offset / 2;
  const r = Math.sqrt(1 - y * y);
  const phi = index * increment;

  return [Math.cos(phi) * r * radius, y * radius, Math.sin(phi) * r * radius] as const;
}

function GlobeCore({ interacting }: { interacting: boolean }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.9, 36, 36]} />
        <meshStandardMaterial color="#ff7a40" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.93, 36, 36]} />
        <meshStandardMaterial color="#ff4d2d" transparent opacity={interacting ? 0.12 : 0.08} />
      </mesh>
    </group>
  );
}

function TechNode({
  item,
  index,
  total,
  hovered,
  setHovered,
  selected,
  setSelected,
}: {
  item: TechGlobeItem;
  index: number;
  total: number;
  hovered: string | null;
  setHovered: (id: string | null) => void;
  selected: string | null;
  setSelected: (id: string | null) => void;
}) {
  const position = useMemo(() => fibonacciPoint(index, total, 2.6), [index, total]);
  const isActive = hovered === item.id || selected === item.id;

  return (
    <group position={position}>
      <mesh
        scale={isActive ? 1.22 : 1}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(item.id);
        }}
        onPointerOut={() => setHovered(null)}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(selected === item.id ? null : item.id);
        }}
      >
        <sphereGeometry args={[0.2, 20, 20]} />
        <meshStandardMaterial
          color={item.color}
          emissive={item.color}
          emissiveIntensity={isActive ? 0.6 : 0.2}
          roughness={0.2}
          metalness={0.45}
        />
      </mesh>

      <Html position={[0, 0, 0.23]} center transform distanceFactor={8}>
        <div className="rounded-full bg-[#11161f]/90 px-1.5 py-0.5 text-[10px] font-bold text-white">
          {item.short}
        </div>
      </Html>

      {isActive && (
        <Html position={[0, -0.38, 0]} center transform distanceFactor={8}>
          <div className="whitespace-nowrap rounded-md border border-primary/40 bg-[#0d1118]/90 px-2 py-1 text-xs font-medium text-primary shadow-[0_8px_24px_-12px_rgba(255,122,64,0.45)]">
            {item.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function GlobeObjects() {
  const rootRef = useRef<Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [interacting, setInteracting] = useState(false);

  useFrame((_, delta) => {
    if (!interacting && rootRef.current) {
      rootRef.current.rotation.y += delta * 0.18;
      rootRef.current.rotation.x = Math.sin(performance.now() * 0.00015) * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 3, 5]} intensity={1.2} color="#ff8a47" />
      <pointLight position={[-3, -2, -4]} intensity={0.55} color="#4fc3ff" />

      <group ref={rootRef}>
        <GlobeCore interacting={interacting} />
        {techGlobeItems.map((item, index) => (
          <TechNode
            key={item.id}
            item={item}
            index={index}
            total={techGlobeItems.length}
            hovered={hovered}
            setHovered={setHovered}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.75}
        rotateSpeed={0.65}
        dampingFactor={0.08}
        onStart={() => setInteracting(true)}
        onEnd={() => setInteracting(false)}
      />
    </>
  );
}

export function SkillsGlobeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6.2], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
      <color attach="background" args={["#06080d"]} />
      <GlobeObjects />
    </Canvas>
  );
}
