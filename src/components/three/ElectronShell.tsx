import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ElectronShellProps {
  shellIndex: number;
  electronCount: number;
  radius: number;
}

function Electron({
  radius,
  speed,
  angularOffset,
  tiltMatrix,
}: {
  radius: number;
  speed: number;
  angularOffset: number;
  tiltMatrix: THREE.Matrix4;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const angle = clock.elapsedTime * speed + angularOffset;
    pos.set(radius * Math.cos(angle), 0, radius * Math.sin(angle));
    pos.applyMatrix4(tiltMatrix);
    meshRef.current.position.copy(pos);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshStandardMaterial
        color="#00ddff"
        emissive="#00ccff"
        emissiveIntensity={3}
        toneMapped={false}
      />
    </mesh>
  );
}

export function ElectronShell({
  shellIndex,
  electronCount,
  radius,
}: ElectronShellProps) {
  // Split into sub-rings if too many electrons
  const subRingCount = electronCount > 8 ? Math.ceil(electronCount / 8) : 1;
  const electronsPerRing = Math.ceil(electronCount / subRingCount);

  const subRings = useMemo(() => {
    const rings = [];
    let remaining = electronCount;
    for (let r = 0; r < subRingCount; r++) {
      const count = Math.min(electronsPerRing, remaining);
      remaining -= count;

      // Each sub-ring gets a unique tilt
      const tiltX = ((shellIndex * 37 + r * 60) % 120) - 60;
      const tiltZ = ((shellIndex * 53 + r * 45) % 80) - 40;
      const matrix = new THREE.Matrix4().makeRotationFromEuler(
        new THREE.Euler(
          THREE.MathUtils.degToRad(tiltX),
          0,
          THREE.MathUtils.degToRad(tiltZ)
        )
      );

      rings.push({ count, tiltMatrix: matrix, ringIndex: r });
    }
    return rings;
  }, [shellIndex, electronCount, subRingCount, electronsPerRing]);

  const speed = 1.2 / (shellIndex + 1);

  return (
    <group>
      {subRings.map((ring) => (
        <group key={ring.ringIndex}>
          {/* Orbital ring */}
          <mesh rotation-x={Math.PI / 2}>
            <torusGeometry args={[radius, 0.008, 8, 64]} />
            <meshBasicMaterial
              color="#00ddff"
              transparent
              opacity={0.08}
              // Apply same tilt via parent
            />
          </mesh>

          {/* Electrons */}
          {Array.from({ length: ring.count }).map((_, i) => (
            <Electron
              key={i}
              radius={radius}
              speed={speed + ring.ringIndex * 0.3}
              angularOffset={
                (i / ring.count) * Math.PI * 2 +
                ring.ringIndex * (Math.PI / subRingCount)
              }
              tiltMatrix={ring.tiltMatrix}
            />
          ))}
        </group>
      ))}
    </group>
  );
}
