"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function NeuralNode({
  position,
  index,
  isHovered,
}: {
  position: [number, number, number];
  index: number;
  isHovered: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  const pulseSpeed = useMemo(() => 0.5 + Math.random() * 1.5, []);
  const pulsePhase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!mesh.current) return;

    const pulse = Math.sin(time * pulseSpeed + pulsePhase) * 0.5 + 0.5;
    const baseScale = isHovered ? 0.18 : 0.12;
    const scale = baseScale + pulse * 0.04;
    mesh.current.scale.setScalar(scale);

    if (glowRef.current) {
      const glowScale = (baseScale + pulse * 0.06) * 2.5;
      glowRef.current.scale.setScalar(glowScale);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.1 + pulse * 0.15;
    }
  });

  const color = useMemo(() => {
    const colors = ["#06b6d4", "#8b5cf6", "#a855f7", "#0ea5e9"];
    return colors[index % colors.length]!;
  }, [index]);

  return (
    <group position={position}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>
      <mesh ref={mesh}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

function NeuralConnection({
  start,
  end,
  index,
}: {
  start: [number, number, number];
  end: [number, number, number];
  index: number;
}) {
  const lineRef = useRef<THREE.Line>(null!);

  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(...start),
      new THREE.Vector3(...end),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [start, end]);

  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.getElapsedTime();
    const pulse = Math.sin(time * 1.5 + index * 0.5) * 0.5 + 0.5;
    (lineRef.current.material as THREE.LineBasicMaterial).opacity =
      0.08 + pulse * 0.15;
  });

  return (
    // @ts-expect-error R3F line element vs SVG line conflict
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#06b6d4" transparent opacity={0.1} />
    </line>
  );
}

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  const layers = useMemo(() => {
    return [
      { count: 4, z: -1.5, radius: 1.2 },
      { count: 6, z: -0.5, radius: 1.8 },
      { count: 8, z: 0.5, radius: 2.2 },
      { count: 6, z: 1.5, radius: 1.8 },
      { count: 4, z: 2.5, radius: 1.2 },
    ];
  }, []);

  const nodes = useMemo(() => {
    const result: { position: [number, number, number]; layer: number; index: number }[] = [];
    layers.forEach((layer, layerIdx) => {
      for (let i = 0; i < layer.count; i++) {
        const angle = (i / layer.count) * Math.PI * 2;
        const x = Math.cos(angle) * layer.radius;
        const y = Math.sin(angle) * layer.radius;
        result.push({
          position: [x, y, layer.z],
          layer: layerIdx,
          index: i,
        });
      }
    });
    return result;
  }, [layers]);

  const connections = useMemo(() => {
    const result: {
      start: [number, number, number];
      end: [number, number, number];
      index: number;
    }[] = [];
    let connIdx = 0;

    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerNodes = nodes.filter((n) => n.layer === l);
      const nextLayerNodes = nodes.filter((n) => n.layer === l + 1);

      currentLayerNodes.forEach((from) => {
        nextLayerNodes.forEach((to) => {
          result.push({
            start: from.position,
            end: to.position,
            index: connIdx++,
          });
        });
      });
    }
    return result;
  }, [nodes, layers]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    groupRef.current.rotation.y = Math.sin(time * 0.15) * 0.3 + time * 0.05;
    groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;

    const scale = viewport.width < 10 ? 0.7 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.05);
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {nodes.map((node, i) => (
        <NeuralNode
          key={`node-${i}`}
          position={node.position}
          index={i}
          isHovered={hovered}
        />
      ))}
      {connections.map((conn, i) => (
        <NeuralConnection
          key={`conn-${i}`}
          start={conn.start}
          end={conn.end}
          index={conn.index}
        />
      ))}
    </group>
  );
}

function BrainParticles({ count = 300 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyanColor = new THREE.Color("#06b6d4");
    const purpleColor = new THREE.Color("#8b5cf6");

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + (Math.random() - 0.5) * 1.5;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const mixFactor = Math.random();
      const color = cyanColor.clone().lerp(purpleColor, mixFactor);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!mesh.current) return;
    mesh.current.rotation.y = time * 0.03;
    mesh.current.rotation.x = Math.sin(time * 0.05) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function InteractiveLighting() {
  const lightRef = useRef<THREE.PointLight>(null!);
  const { viewport } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!lightRef.current) return;

    const x = Math.sin(time * 0.3) * 4;
    const y = Math.cos(time * 0.2) * 3;
    const z = 5 + Math.sin(time * 0.4) * 2;
    lightRef.current.position.set(x, y, z);
  });

  return (
    <pointLight
      ref={lightRef}
      color="#8b5cf6"
      intensity={3}
      distance={20}
      decay={2}
    />
  );
}

function CameraAnimation() {
  const { camera } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const radius = 7;
    camera.position.x = Math.sin(time * 0.1) * radius * 0.3;
    camera.position.y = Math.cos(time * 0.08) * radius * 0.15 + 0.5;
    camera.position.z = radius + Math.sin(time * 0.05) * 1;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", 8, 25]} />

      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
      <InteractiveLighting />

      <NeuralNetwork />
      <BrainParticles count={250} />

      <CameraAnimation />
    </>
  );
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
