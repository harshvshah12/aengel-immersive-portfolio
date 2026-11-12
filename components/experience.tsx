"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Stars, Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function HeroArtifact() {
  const root = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Group>(null);
  const nodes = useMemo(() => Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2;
    return [Math.cos(a) * 2.35, Math.sin(a * 2) * .42, Math.sin(a) * 1.25] as [number, number, number];
  }), []);
  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y += delta * .075;
      root.current.rotation.x = Math.sin(t * .22) * .12;
      root.current.position.y = Math.sin(t * .48) * .12;
    }
    if (core.current) {
      core.current.rotation.x += delta * .12;
      core.current.rotation.y -= delta * .18;
    }
    if (ring.current) ring.current.rotation.z = Math.sin(t * .18) * .18;
  });
  return <group ref={root}>
    <mesh ref={core}>
      <icosahedronGeometry args={[1.28, 3]} />
      <meshPhysicalMaterial color="#aabbb0" metalness={.82} roughness={.24} wireframe transparent opacity={.68} />
    </mesh>
    <mesh scale={.72}>
      <icosahedronGeometry args={[1.28, 2]} />
      <meshStandardMaterial color="#d7e5dc" metalness={.6} roughness={.2} wireframe />
    </mesh>
    <group ref={ring}>
      {[0, 1, 2].map((i) => <mesh key={i} rotation={[Math.PI / 2 + i * .65, i * .8, i * .35]}>
        <torusGeometry args={[1.9 + i * .2, .008, 8, 180]} />
        <meshBasicMaterial color={i === 1 ? "#d6e7dc" : "#82968a"} transparent opacity={.48 - i * .08} />
      </mesh>)}
      {nodes.map((p, i) => <mesh key={i} position={p}>
        <sphereGeometry args={[i % 4 === 0 ? .035 : .018, 10, 10]} />
        <meshBasicMaterial color="#dce9df" />
      </mesh>)}
    </group>
    <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, -.7]}>
      <torusGeometry args={[2.7, .004, 6, 180]} />
      <meshBasicMaterial color="#8ea095" transparent opacity={.24} />
    </mesh>
  </group>;
}

function HeroCanvas() {
  return <Canvas camera={{ position: [0, 0, 6.2], fov: 38 }} dpr={[1, 1.7]} gl={{ alpha: true, antialias: true }}>
    <ambientLight intensity={.7} />
    <pointLight position={[4, 4, 5]} intensity={28} color="#d8eadf" />
    <pointLight position={[-4, -2, -3]} intensity={12} color="#789c87" />
    <Float speed={1.1} rotationIntensity={.12} floatIntensity={.22}><HeroArtifact /></Float>
    <Sparkles count={110} scale={8} size={1.5} speed={.22} opacity={.55} color="#c6d8cb" />
    <Stars radius={20} depth={8} count={350} factor={2} fade speed={.3} />
    <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={.28} />
  </Canvas>;
}

function WireframeModel() {
  return <group>
    <mesh><icosahedronGeometry args={[1.15, 3]} /><meshPhysicalMaterial color="#b9cbbf" metalness={.8} roughness={.25} wireframe /></mesh>
    <mesh scale={1.035}><icosahedronGeometry args={[1.15, 2]} /><meshBasicMaterial color="#e3eee6" wireframe transparent opacity={.2} /></mesh>
    {Array.from({ length: 18 }, (_, i) => {
      const a = i / 18 * Math.PI * 2;
      return <mesh key={i} position={[Math.cos(a) * 1.45, Math.sin(a * 3) * .35, Math.sin(a) * 1.45]}>
        <sphereGeometry args={[.035, 8, 8]} /><meshBasicMaterial color="#e5f0e8" />
      </mesh>;
    })}
  </group>;
}

function CubeStudio() {
  return <group>
    <mesh rotation={[.45, .65, .12]}>
      <boxGeometry args={[1.8, 1.8, 1.8]} />
      <meshPhysicalMaterial color="#a9bcb0" metalness={.55} roughness={.28} wireframe />
    </mesh>
    {Array.from({ length: 3 }, (_, i) => <mesh key={i} position={[(i - 1) * .62, .08, 1.02]} rotation={[0, 0, -.12]}>
      <planeGeometry args={[.48, .9]} /><meshStandardMaterial color={i === 1 ? "#c4d7c9" : "#728b7b"} side={THREE.DoubleSide} metalness={.25} roughness={.5} />
    </mesh>)}
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.35, 0]}><torusGeometry args={[1.65, .012, 8, 100]} /><meshBasicMaterial color="#a6b8aa" /></mesh>
  </group>;
}

function ProductComposer() {
  return <group>
    <mesh position={[0, -.65, 0]}><cylinderGeometry args={[1.35, 1.45, .18, 64]} /><meshStandardMaterial color="#26352d" metalness={.75} roughness={.26} /></mesh>
    <mesh position={[0, .12, 0]}><boxGeometry args={[1.05, 1.35, .72]} /><meshPhysicalMaterial color="#b7c9bc" metalness={.5} roughness={.24} clearcoat={.8} /></mesh>
    <mesh position={[0, .12, .37]}><boxGeometry args={[.72, .96, .018]} /><meshStandardMaterial color="#35483c" metalness={.3} roughness={.35} /></mesh>
    <mesh position={[.72, .7, .35]}><sphereGeometry args={[.09, 24, 24]} /><meshBasicMaterial color="#d7e8dc" /></mesh>
    <axesHelper args={[1.9]} />
    {[-1, 1].map((x) => <mesh key={x} position={[x * 1.05, .15, 0]}><sphereGeometry args={[.045, 12, 12]} /><meshBasicMaterial color="#d8e8dc" /></mesh>)}
  </group>;
}

function WorldGlobe() {
  const globe = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (globe.current) globe.current.rotation.y += delta * .09; });
  return <group ref={globe}>
    <mesh><sphereGeometry args={[1.18, 48, 32]} /><meshPhysicalMaterial color="#273d32" roughness={.85} metalness={.12} wireframe transparent opacity={.28} /></mesh>
    <mesh><sphereGeometry args={[1.12, 48, 32]} /><meshStandardMaterial color="#6f927a" roughness={.9} transparent opacity={.17} /></mesh>
    {[0, 1, 2, 3, 4].map((i) => <mesh key={i} rotation={[i * .42, i * .7, .4]}>
      <torusGeometry args={[1.2 + (i % 2) * .12, .012, 6, 100, Math.PI * 1.25]} />
      <meshBasicMaterial color={i % 2 ? "#d5e5d8" : "#91b39b"} transparent opacity={.75} />
    </mesh>)}
    {Array.from({ length: 12 }, (_, i) => {
      const a = i / 12 * Math.PI * 2;
      return <mesh key={i} position={[Math.cos(a) * 1.2, Math.sin(a * 2) * .28, Math.sin(a) * 1.2]}>
        <sphereGeometry args={[.035, 8, 8]} /><meshBasicMaterial color="#e4f0e7" />
      </mesh>;
    })}
  </group>;
}

function FloatingIsland() {
  return <group>
    <mesh position={[0, -.35, 0]} scale={[1.45, .5, 1.15]}><sphereGeometry args={[1, 48, 32]} /><meshStandardMaterial color="#435e48" roughness={.9} /></mesh>
    <mesh position={[0, -.05, 0]} scale={[1.35, .18, 1.08]}><cylinderGeometry args={[1, 1.05, .2, 64]} /><meshStandardMaterial color="#263c36" metalness={.5} roughness={.3} /></mesh>
    {[-.55, .2, .62].map((x, i) => <group key={i} position={[x, .12 + (i % 2) * .12, i === 1 ? .25 : -.18]}>
      <mesh position={[0, .34, 0]}><coneGeometry args={[.25, .8 + i * .12, 7]} /><meshStandardMaterial color={i === 1 ? "#a4b69a" : "#637f67"} roughness={.8} /></mesh>
      <mesh position={[0, -.08, 0]}><cylinderGeometry args={[.035, .045, .28, 8]} /><meshStandardMaterial color="#6d5842" /></mesh>
    </group>)}
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -.55, 0]}><torusGeometry args={[1.8, .012, 8, 100]} /><meshBasicMaterial color="#8cae9a" transparent opacity={.55} /></mesh>
    <mesh rotation={[Math.PI / 2, .3, .2]} position={[0, -.62, 0]}><torusGeometry args={[2.05, .006, 8, 100]} /><meshBasicMaterial color="#d3e5d8" transparent opacity={.3} /></mesh>
  </group>;
}

function CoinChain() {
  return <group>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[.9, .9, .18, 96, 1]} />
      <meshPhysicalMaterial color="#c2a66d" metalness={1} roughness={.2} />
    </mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, .105]}>
      <torusGeometry args={[.72, .045, 12, 96]} /><meshStandardMaterial color="#ead8a7" metalness={1} roughness={.22} />
    </mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, .11]}>
      <torusGeometry args={[.43, .018, 8, 64]} /><meshBasicMaterial color="#f0dfb3" />
    </mesh>
    <mesh position={[0, 0, .12]}><torusKnotGeometry args={[.27, .075, 120, 12, 2, 5]} /><meshStandardMaterial color="#f0d9a2" metalness={1} roughness={.19} /></mesh>
    {Array.from({ length: 14 }, (_, i) => <mesh key={i} position={[Math.cos(i * .32) * 1.45, -.5 + i * .075, Math.sin(i * .32) * .45]} rotation={[i * .15, i * .25, i * .1]}>
      <torusGeometry args={[.13, .028, 8, 24]} /><meshStandardMaterial color="#b79a61" metalness={.95} roughness={.25} />
    </mesh>)}
  </group>;
}

function ProjectObject({ index }: { index: number }) {
  const object = useRef<THREE.Group>(null);
  useFrame(({ clock }, delta) => {
    if (!object.current) return;
    object.current.rotation.y += delta * (index === 5 ? .16 : .075);
    object.current.position.y = Math.sin(clock.elapsedTime * .55) * .075;
  });
  return <group ref={object}>
    {index === 0 && <WireframeModel />}
    {index === 1 && <CubeStudio />}
    {index === 2 && <ProductComposer />}
    {index === 3 && <WorldGlobe />}
    {index === 4 && <FloatingIsland />}
    {index === 5 && <CoinChain />}
  </group>;
}

export function ProjectExperience({ activeIndex }: { activeIndex: number }) {
  return <Canvas camera={{ position: [0, .15, 4.7], fov: 38 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
    <ambientLight intensity={.9} />
    <hemisphereLight args={["#d7e8dc", "#15231b", 1.2]} />
    <pointLight position={[3, 4, 4]} intensity={35} color="#e2eee4" />
    <pointLight position={[-3, -2, -3]} intensity={18} color="#759b81" />
    <Float speed={1.1} rotationIntensity={.1} floatIntensity={.12}><ProjectObject key={activeIndex} index={activeIndex} /></Float>
    <Sparkles count={48} scale={5.5} size={1.2} speed={.18} opacity={.42} color="#c4d9c9" />
    <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
  </Canvas>;
}

export function Experience({ active }: { active: boolean }) {
  return <HeroCanvas />;
}
