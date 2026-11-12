"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function WireStructure() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.075;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.12;
    }
    if (inner.current) inner.current.rotation.y -= delta * 0.11;
  });
  return (
    <group ref={group}>
      <mesh ref={inner}><icosahedronGeometry args={[1.42, 2]} /><meshBasicMaterial color="#b9c4c0" wireframe transparent opacity={0.5} /></mesh>
      <mesh scale={1.08}><icosahedronGeometry args={[1.42, 1]} /><meshBasicMaterial color="#75827f" wireframe transparent opacity={0.2} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[2.05, 0.003, 8, 160]} /><meshBasicMaterial color="#d8e2dc" transparent opacity={0.55} /></mesh>
      <mesh rotation={[0.6, 0.4, 0.8]}><torusGeometry args={[2.3, 0.002, 8, 160]} /><meshBasicMaterial color="#9ba9a3" transparent opacity={0.35} /></mesh>
      {Array.from({ length: 12 }).map((_, i) => <mesh key={i} position={[Math.sin(i * Math.PI / 6) * 2.2, Math.cos(i * Math.PI / 6) * 1.45, Math.sin(i * 2.4) * 0.4]}><sphereGeometry args={[0.025, 8, 8]} /><meshBasicMaterial color="#e8eee8" /></mesh>)}
    </group>
  );
}

export function Experience({ active }: { active: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 6.4], fov: 38 }} dpr={[1, 1.7]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[3, 3, 4]} intensity={2} color="#d6e4df" />
      <Float speed={active ? 1.4 : 0.6} rotationIntensity={0.12} floatIntensity={0.3}>
        <WireStructure />
      </Float>
      <Sparkles count={70} scale={7} size={1.3} speed={0.18} opacity={0.5} color="#b6c6c0" />
      <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.32} />
    </Canvas>
  );
}