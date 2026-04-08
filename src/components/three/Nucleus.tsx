import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NucleusProps {
  protons: number;
  neutrons: number;
}

// Pack nucleons tightly into a spherical cluster
// Each nucleon touches its neighbors like balls in a bag
function packNucleons(
  count: number,
  nucleonRadius: number
): THREE.Vector3[] {
  if (count === 0) return [];
  if (count === 1) return [new THREE.Vector3(0, 0, 0)];

  const positions: THREE.Vector3[] = [];
  // Place first nucleon at center
  positions.push(new THREE.Vector3(0, 0, 0));

  // Place remaining nucleons in expanding shells
  let placed = 1;
  let shell = 1;

  while (placed < count) {
    // Number of nucleons on this shell surface (approximate)
    const shellRadius = shell * nucleonRadius * 2 * 0.85; // 0.85 for tight packing
    const shellCapacity = Math.max(
      1,
      Math.floor(4 * Math.PI * shell * shell * 0.8)
    );
    const toPlace = Math.min(shellCapacity, count - placed);

    // Distribute evenly on shell using fibonacci sphere
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < toPlace; i++) {
      const theta = (2 * Math.PI * (placed + i)) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / toPlace);
      positions.push(
        new THREE.Vector3(
          shellRadius * Math.sin(phi) * Math.cos(theta),
          shellRadius * Math.sin(phi) * Math.sin(theta),
          shellRadius * Math.cos(phi)
        )
      );
    }

    placed += toPlace;
    shell++;
  }

  return positions.slice(0, count);
}

export function Nucleus({ protons, neutrons }: NucleusProps) {
  const groupRef = useRef<THREE.Group>(null);
  const protonRef = useRef<THREE.InstancedMesh>(null);
  const neutronRef = useRef<THREE.InstancedMesh>(null);

  const total = protons + neutrons;
  // Nucleon visual radius scales with total count
  const nucleonRadius = total <= 10 ? 0.12 : Math.max(0.04, 0.14 - total * 0.0004);

  // Interleave protons and neutrons so they mix together
  const allPositions = useMemo(
    () => packNucleons(total, nucleonRadius),
    [total, nucleonRadius]
  );

  // Split positions: even indices -> protons, odd indices -> neutrons
  const { protonPositions, neutronPositions } = useMemo(() => {
    const pp: THREE.Vector3[] = [];
    const np: THREE.Vector3[] = [];
    let pCount = 0;
    let nCount = 0;
    for (let i = 0; i < allPositions.length; i++) {
      if (pCount < protons && (nCount >= neutrons || i % 2 === 0)) {
        pp.push(allPositions[i]);
        pCount++;
      } else if (nCount < neutrons) {
        np.push(allPositions[i]);
        nCount++;
      }
    }
    return { protonPositions: pp, neutronPositions: np };
  }, [allPositions, protons, neutrons]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (protonRef.current) {
      protonPositions.forEach((pos, i) => {
        dummy.position.copy(pos);
        dummy.updateMatrix();
        protonRef.current!.setMatrixAt(i, dummy.matrix);
      });
      protonRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [protonPositions, dummy]);

  useEffect(() => {
    if (neutronRef.current) {
      neutronPositions.forEach((pos, i) => {
        dummy.position.copy(pos);
        dummy.updateMatrix();
        neutronRef.current!.setMatrixAt(i, dummy.matrix);
      });
      neutronRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [neutronPositions, dummy]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 2) * 0.02;
      groupRef.current.scale.setScalar(s);
      groupRef.current.rotation.y = clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {protons > 0 && (
        <instancedMesh
          ref={protonRef}
          args={[undefined, undefined, protons]}
          frustumCulled={false}
        >
          <sphereGeometry args={[nucleonRadius, 16, 16]} />
          <meshStandardMaterial
            color="#e05555"
            roughness={0.4}
            metalness={0.1}
          />
        </instancedMesh>
      )}
      {neutrons > 0 && (
        <instancedMesh
          ref={neutronRef}
          args={[undefined, undefined, neutrons]}
          frustumCulled={false}
        >
          <sphereGeometry args={[nucleonRadius, 16, 16]} />
          <meshStandardMaterial
            color="#5588cc"
            roughness={0.4}
            metalness={0.1}
          />
        </instancedMesh>
      )}
    </group>
  );
}
