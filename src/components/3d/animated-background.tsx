"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 600 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const light = useRef<THREE.PointLight>(null!);
  const { viewport } = useThree();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { positions, scales, speeds, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    const spd = new Float32Array(count);
    const phs = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * viewport.width * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      scl[i] = Math.random() * 0.02 + 0.005;
      spd[i] = Math.random() * 0.3 + 0.1;
      phs[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, scales: scl, speeds: spd, phases: phs };
  }, [count, viewport.width, viewport.height]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const handlePointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    setMousePos({ x: e.point.x, y: e.point.y });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const posArr = positions;
    const spdArr = speeds;
    const phsArr = phases;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const baseX = posArr[i3] ?? 0;
      const baseY = posArr[i3 + 1] ?? 0;
      const baseZ = posArr[i3 + 2] ?? 0;
      const spd = spdArr[i] ?? 0.1;
      const phs = phsArr[i] ?? 0;

      const offsetX = Math.sin(time * spd + phs) * 0.5;
      const offsetY = Math.cos(time * spd * 0.7 + phs) * 0.3;
      const offsetZ = Math.sin(time * spd * 0.5 + phs * 2) * 0.2;

      const dx = mousePos.x - baseX;
      const dy = mousePos.y - baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 3) * 0.4;
      const pushX = dist > 0.01 ? (-dx / dist) * influence : 0;
      const pushY = dist > 0.01 ? (-dy / dist) * influence : 0;

      dummy.position.set(
        baseX + offsetX + pushX,
        baseY + offsetY + pushY,
        baseZ + offsetZ
      );
      dummy.scale.setScalar((scales[i] ?? 0.01) * (1 + Math.sin(time * 2 + phs) * 0.2));
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;

    if (light.current) {
      light.current.position.x = mousePos.x * 0.5;
      light.current.position.y = mousePos.y * 0.5;
    }
  });

  return (
    <>
      <pointLight ref={light} color="#06b6d4" intensity={2} distance={15} />
      <instancedMesh
        ref={mesh}
        args={[undefined, undefined, count]}
        onPointerMove={handlePointerMove}
      >
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
      </instancedMesh>
    </>
  );
}

interface ShapeProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  color: string;
  geometry: "cube" | "sphere" | "torus";
}

function FloatingShape({ position, rotation, scale, speed, color, geometry }: ShapeProps) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!mesh.current) return;

    mesh.current.position.y = position[1] + Math.sin(time * speed) * 0.3;
    mesh.current.position.x = position[0] + Math.cos(time * speed * 0.5) * 0.2;
    mesh.current.rotation.x = rotation[0] + time * speed * 0.3;
    mesh.current.rotation.y = rotation[1] + time * speed * 0.2;
    mesh.current.rotation.z = rotation[2] + time * speed * 0.1;

    const targetScale = hovered ? scale * 1.3 : scale;
    mesh.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case "cube":
        return <boxGeometry args={[1, 1, 1]} />;
      case "torus":
        return <torusGeometry args={[0.6, 0.25, 16, 32]} />;
      case "sphere":
      default:
        return <sphereGeometry args={[0.6, 32, 32]} />;
    }
  }, [geometry]);

  return (
    <mesh
      ref={mesh}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {geo}
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
        emissive={color}
        emissiveIntensity={hovered ? 0.8 : 0.3}
      />
    </mesh>
  );
}

const shapes: ShapeProps[] = [
  { position: [-4, 2, -3], rotation: [0.5, 0.3, 0], scale: 0.8, speed: 0.4, color: "#8b5cf6", geometry: "cube" },
  { position: [4, -1, -4], rotation: [0.2, 0.8, 0.1], scale: 0.6, speed: 0.3, color: "#06b6d4", geometry: "sphere" },
  { position: [-3, -2, -5], rotation: [0.7, 0.2, 0.5], scale: 0.7, speed: 0.35, color: "#a855f7", geometry: "torus" },
  { position: [3, 3, -6], rotation: [0.1, 0.6, 0.3], scale: 0.5, speed: 0.45, color: "#0ea5e9", geometry: "cube" },
  { position: [5, 1, -3], rotation: [0.4, 0.1, 0.7], scale: 0.4, speed: 0.25, color: "#7c3aed", geometry: "sphere" },
  { position: [-5, -1, -4], rotation: [0.3, 0.5, 0.2], scale: 0.55, speed: 0.38, color: "#06b6d4", geometry: "torus" },
  { position: [0, 3, -7], rotation: [0.6, 0.4, 0.1], scale: 0.9, speed: 0.2, color: "#8b5cf6", geometry: "cube" },
  { position: [-2, -3, -5], rotation: [0.2, 0.7, 0.4], scale: 0.45, speed: 0.32, color: "#0ea5e9", geometry: "sphere" },
];

function AuroraPlane() {
  const mesh = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#8b5cf6") },
      uColor2: { value: new THREE.Color("#06b6d4") },
      uColor3: { value: new THREE.Color("#a855f7") },
    }),
    []
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (materialRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (materialRef.current.uniforms as any).uTime.value = time;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float elevation = sin(pos.x * 2.0 + uTime * 0.5) * 0.3
                       + sin(pos.y * 1.5 + uTime * 0.3) * 0.2
                       + sin(pos.x * pos.y + uTime * 0.2) * 0.1;
      pos.z += elevation;
      vElevation = elevation;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;

    void main() {
      float mixFactor = sin(vUv.x * 3.0 + uTime * 0.3) * 0.5 + 0.5;
      float mixFactor2 = cos(vUv.y * 2.0 + uTime * 0.2) * 0.5 + 0.5;

      vec3 color = mix(uColor1, uColor2, mixFactor);
      color = mix(color, uColor3, mixFactor2 * 0.3);

      float alpha = (0.15 + vElevation * 0.1) * (1.0 - length(vUv - 0.5) * 0.8);
      alpha = clamp(alpha, 0.0, 0.3);

      gl_FragColor = vec4(color, alpha);
    }
  `;

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 3, 0, 0]} position={[0, -3, -2]}>
      <planeGeometry args={[20, 20, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[-5, -5, 5]} intensity={0.3} color="#06b6d4" />

      <Particles count={500} />
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
      <AuroraPlane />

      <fog attach="fog" args={["#0a0a0f", 5, 20]} />
    </>
  );
}

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
