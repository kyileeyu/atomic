import { useRef, useEffect, useCallback } from "react";
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
  const { camera, gl } = useThree();
  const hasTransitioned = useRef(false);

  // Three-finger rotation state
  const threeFingerState = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    startAzimuth: number;
    startPolar: number;
  }>({ active: false, startX: 0, startY: 0, startAzimuth: 0, startPolar: 0 });

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 3 && controlsRef.current) {
        e.preventDefault();
        // Disable OrbitControls while we handle 3-finger
        controlsRef.current.enabled = false;

        const cx = (e.touches[0].clientX + e.touches[1].clientX + e.touches[2].clientX) / 3;
        const cy = (e.touches[0].clientY + e.touches[1].clientY + e.touches[2].clientY) / 3;

        threeFingerState.current = {
          active: true,
          startX: cx,
          startY: cy,
          startAzimuth: controlsRef.current.getAzimuthalAngle(),
          startPolar: controlsRef.current.getPolarAngle(),
        };
      }
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const state = threeFingerState.current;
      if (!state.active || e.touches.length !== 3 || !controlsRef.current) return;
      e.preventDefault();

      const cx = (e.touches[0].clientX + e.touches[1].clientX + e.touches[2].clientX) / 3;
      const cy = (e.touches[0].clientY + e.touches[1].clientY + e.touches[2].clientY) / 3;

      const dx = (cx - state.startX) * 0.005;
      const dy = (cy - state.startY) * 0.005;

      // Spherical rotation around target
      const spherical = new THREE.Spherical().setFromVector3(
        camera.position.clone().sub(controlsRef.current.target)
      );
      spherical.theta = state.startAzimuth - dx;
      spherical.phi = THREE.MathUtils.clamp(
        state.startPolar + dy,
        0.1,
        Math.PI - 0.1
      );

      const offset = new THREE.Vector3().setFromSpherical(spherical);
      camera.position.copy(controlsRef.current.target).add(offset);
      camera.lookAt(controlsRef.current.target);
    },
    [camera]
  );

  const handleTouchEnd = useCallback(() => {
    if (threeFingerState.current.active) {
      threeFingerState.current.active = false;
      // Re-enable OrbitControls
      if (controlsRef.current) {
        controlsRef.current.enabled = true;
      }
    }
  }, []);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchcancel", handleTouchEnd);
    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [gl, handleTouchStart, handleTouchMove, handleTouchEnd]);

  useFrame(() => {
    const isAtom = viewMode === "atom" || viewMode === "transitioning";
    const target = isAtom ? ATOM_POS : TABLE_POS;

    if (!threeFingerState.current.active) {
      camera.position.lerp(target, 0.04);
    }

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

  const isAtom = viewMode === "atom";

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom
      enableRotate={isAtom}
      enablePan={false}
      minDistance={isAtom ? 5 : 15}
      maxDistance={isAtom ? 25 : 50}
      autoRotate={isAtom}
      autoRotateSpeed={0.5}
      zoomSpeed={0.8}
    />
  );
}
