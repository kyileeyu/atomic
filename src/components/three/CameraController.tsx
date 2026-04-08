import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useAppStore } from "../../store/useAppStore";

const TABLE_POS = new THREE.Vector3(0, 0, 30);
const ATOM_POS = new THREE.Vector3(0, 3, 12);

export function CameraController() {
  const viewMode = useAppStore((s) => s.viewMode);
  const setViewMode = useAppStore((s) => s.setViewMode);
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const hasTransitioned = useRef(false);

  useFrame(() => {
    const isAtom = viewMode === "atom" || viewMode === "transitioning";
    const target = isAtom ? ATOM_POS : TABLE_POS;

    camera.position.lerp(target, 0.04);

    if (
      viewMode === "transitioning" &&
      camera.position.distanceTo(ATOM_POS) < 0.5 &&
      !hasTransitioned.current
    ) {
      hasTransitioned.current = true;
      setViewMode("atom");
    }

    if (viewMode === "table") {
      hasTransitioned.current = false;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={viewMode === "atom"}
      enablePan={false}
      minDistance={5}
      maxDistance={25}
      autoRotate={viewMode === "atom"}
      autoRotateSpeed={0.5}
    />
  );
}
