import { useAppStore } from "../../store/useAppStore";
import { AtomView } from "./AtomView";
import { ParticleBackground } from "./ParticleBackground";
import { CameraController } from "./CameraController";

export function Scene() {
  const selectedElement = useAppStore((s) => s.selectedElement);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -5, 5]} intensity={0.5} color="#4488ff" />

      <CameraController />
      <ParticleBackground />

      {selectedElement && <AtomView element={selectedElement} />}
    </>
  );
}
