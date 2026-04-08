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
}: {
  radius: number;
  speed: number;
  angularOffset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const angle = clock.elapsedTime * speed + angularOffset;
    meshRef.current.position.set(
      radius * Math.cos(angle),
      0,
      radius * Math.sin(angle)
    );
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshStandardMaterial
        color="#44ccff"
        emissive="#0088cc"
        emissiveIntensity={0.4}
        roughness={0.3}
        metalness={0.2}
      />
    </mesh>
  );
}

export function ElectronShell({
  shellIndex,
  electronCount,
  radius,
}: ElectronShellProps) {
  const subRingCount = electronCount > 8 ? Math.ceil(electronCount / 8) : 1;
  const electronsPerRing = Math.ceil(electronCount / subRingCount);

  const subRings = useMemo(() => {
    const rings = [];
    let remaining = electronCount;
    for (let r = 0; r < subRingCount; r++) {
      const count = Math.min(electronsPerRing, remaining);
      remaining -= count;

      // Each sub-ring gets a unique tilt as Euler angles
      const tiltX = THREE.MathUtils.degToRad(
        ((shellIndex * 37 + r * 60) % 120) - 60
      );
      const tiltZ = THREE.MathUtils.degToRad(
        ((shellIndex * 53 + r * 45) % 80) - 40
      );

      rings.push({ count, tiltX, tiltZ, ringIndex: r });
    }
    return rings;
  }, [shellIndex, electronCount, subRingCount, electronsPerRing]);

  const speed = 1.2 / (shellIndex + 1);

  return (
    <group>
      {subRings.map((ring) => (
        // Apply the SAME rotation to both the ring and the electrons
        <group
          key={ring.ringIndex}
          rotation={[ring.tiltX, 0, ring.tiltZ]}
        >
          {/* Orbital ring - lies in XZ plane, so rotate to XZ */}
          <mesh rotation-x={Math.PI / 2}>
            <torusGeometry args={[radius, 0.008, 8, 64]} />
            <meshBasicMaterial
              color="#00ddff"
              transparent
              opacity={0.1}
            />
          </mesh>

          {/* Electrons - orbit in XZ plane, matching the ring */}
          {Array.from({ length: ring.count }).map((_, i) => (
            <Electron
              key={i}
              radius={radius}
              speed={speed + ring.ringIndex * 0.3}
              angularOffset={
                (i / ring.count) * Math.PI * 2 +
                ring.ringIndex * (Math.PI / subRingCount)
              }
            />
          ))}
        </group>
      ))}
    </group>
  );
}
