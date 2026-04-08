import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NucleusProps {
  protons: number;
  neutrons: number;
}

function packSphere(count: number, baseRadius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  if (count === 0) return points;
  if (count === 1) return [new THREE.Vector3(0, 0, 0)];

  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const r = baseRadius * Math.cbrt((i + 1) / count);
    points.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      )
    );
  }
  return points;
}

export function Nucleus({ protons, neutrons }: NucleusProps) {
  const groupRef = useRef<THREE.Group>(null);
  const total = protons + neutrons;
  const nucleusRadius = Math.cbrt(total) * 0.2;

  const protonPositions = useMemo(
    () => packSphere(protons, nucleusRadius),
    [protons, nucleusRadius]
  );
  const neutronPositions = useMemo(
    () => packSphere(neutrons, nucleusRadius),
    [neutrons, nucleusRadius]
  );

  const protonDummy = useMemo(() => new THREE.Object3D(), []);
  const neutronDummy = useMemo(() => new THREE.Object3D(), []);

  const protonRef = useRef<THREE.InstancedMesh>(null);
  const neutronRef = useRef<THREE.InstancedMesh>(null);

  useMemo(() => {
    if (!protonRef.current) return;
    protonPositions.forEach((pos, i) => {
      protonDummy.position.copy(pos);
      protonDummy.updateMatrix();
      protonRef.current!.setMatrixAt(i, protonDummy.matrix);
    });
    protonRef.current.instanceMatrix.needsUpdate = true;
  }, [protonPositions, protonDummy]);

  useMemo(() => {
    if (!neutronRef.current) return;
    neutronPositions.forEach((pos, i) => {
      neutronDummy.position.copy(pos);
      neutronDummy.updateMatrix();
      neutronRef.current!.setMatrixAt(i, neutronDummy.matrix);
    });
    neutronRef.current.instanceMatrix.needsUpdate = true;
  }, [neutronPositions, neutronDummy]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 2) * 0.03;
      groupRef.current.scale.setScalar(s);
      groupRef.current.rotation.y = clock.elapsedTime * 0.3;
    }
  });

  const sphereSize = Math.max(0.06, 0.15 - total * 0.0003);

  return (
    <group ref={groupRef}>
      {/* Protons */}
      {protons > 0 && (
        <instancedMesh
          ref={protonRef}
          args={[undefined, undefined, protons]}
          frustumCulled={false}
        >
          <sphereGeometry args={[sphereSize, 12, 12]} />
          <meshStandardMaterial
            color="#ff6b6b"
            emissive="#ff3333"
            emissiveIntensity={0.5}
            roughness={0.3}
          />
        </instancedMesh>
      )}
      {/* Neutrons */}
      {neutrons > 0 && (
        <instancedMesh
          ref={neutronRef}
          args={[undefined, undefined, neutrons]}
          frustumCulled={false}
        >
          <sphereGeometry args={[sphereSize, 12, 12]} />
          <meshStandardMaterial
            color="#6bb5ff"
            emissive="#3388ff"
            emissiveIntensity={0.3}
            roughness={0.3}
          />
        </instancedMesh>
      )}
      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[nucleusRadius * 0.8, 16, 16]} />
        <meshStandardMaterial
          color="#ffaa44"
          emissive="#ff6600"
          emissiveIntensity={1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
