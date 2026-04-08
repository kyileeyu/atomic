import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "motion/react";
import { useAppStore } from "./store/useAppStore";
import { Scene } from "./components/three/Scene";
import { PeriodicTable } from "./components/ui/PeriodicTable";
import { SearchBar } from "./components/ui/SearchBar";
import { CategoryLegend } from "./components/ui/CategoryLegend";
import { InfoPanel } from "./components/ui/InfoPanel";
import { BackButton } from "./components/ui/BackButton";

function App() {
  const viewMode = useAppStore((s) => s.viewMode);
  const selectedElement = useAppStore((s) => s.selectedElement);

  const showTable = viewMode === "table";
  const showAtom = viewMode === "atom" || viewMode === "transitioning";

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-950">
      {/* 3D Canvas - always rendered behind */}
      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 30], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>

      {/* 2D UI overlay */}
      <div className="relative z-10 h-full flex flex-col">
        <AnimatePresence mode="wait">
          {showTable && (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col h-full"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4">
                <div>
                  <h1 className="text-xl font-bold text-white/90 tracking-tight">
                    Atomic
                  </h1>
                  <p className="text-xs text-white/30">
                    Interactive Periodic Table
                  </p>
                </div>
                <SearchBar />
              </div>

              {/* Table */}
              <div className="flex-1 flex items-center justify-center overflow-auto">
                <PeriodicTable />
              </div>

              {/* Legend */}
              <div className="py-3">
                <CategoryLegend />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAtom && selectedElement && (
            <>
              <BackButton />
              <InfoPanel element={selectedElement} />

              {/* Element name overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
                className="fixed bottom-8 left-8 z-20"
              >
                <p className="text-white/20 text-sm font-mono">
                  {selectedElement.electronConfiguration}
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
