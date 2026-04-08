import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Element } from "../../types/element";
import { Nucleus } from "./Nucleus";
import { ElectronShell } from "./ElectronShell";

interface AtomViewProps {
  element: Element;
}

export function AtomView({ element }: AtomViewProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scaleRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, 1, delta * 3);
    groupRef.current.scale.setScalar(scaleRef.current);
  });

  return (
    <group ref={groupRef} scale={0}>
      <Nucleus protons={element.protons} neutrons={element.neutrons} />
      {element.shells.map((electronCount, shellIndex) => (
        <ElectronShell
          key={shellIndex}
          shellIndex={shellIndex}
          electronCount={electronCount}
          radius={1.5 + shellIndex * 1.2}
        />
      ))}
    </group>
  );
}
