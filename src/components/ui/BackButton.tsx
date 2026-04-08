import { motion } from "motion/react";
import { useAppStore } from "../../store/useAppStore";

export function BackButton() {
  const clearSelection = useAppStore((s) => s.clearSelection);

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onClick={clearSelection}
      className="fixed top-6 left-6 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-sm hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
    >
      <span>&larr;</span>
      <span>주기율표</span>
    </motion.button>
  );
}
