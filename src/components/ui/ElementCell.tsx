import { memo } from "react";
import { motion } from "motion/react";
import type { Element } from "../../types/element";
import { CATEGORY_STYLES } from "../../constants/categories";
import { useAppStore } from "../../store/useAppStore";

interface ElementCellProps {
  element: Element;
}

export const ElementCell = memo(function ElementCell({
  element,
}: ElementCellProps) {
  const selectElement = useAppStore((s) => s.selectElement);
  const setHovered = useAppStore((s) => s.setHovered);
  const searchQuery = useAppStore((s) => s.searchQuery);
  const activeCategory = useAppStore((s) => s.activeCategory);

  const catStyle = CATEGORY_STYLES[element.category];

  const isFiltered =
    (searchQuery &&
      !element.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !element.symbol.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !element.nameKo.includes(searchQuery)) ||
    (activeCategory && element.category !== activeCategory);

  return (
    <motion.button
      className="relative flex flex-col items-center justify-center rounded-sm border border-white/10 p-1 cursor-pointer select-none aspect-square min-h-[40px]"
      style={{
        gridColumn: element.gridColumn,
        gridRow: element.gridRow,
        opacity: isFiltered ? 0.15 : 1,
        backgroundColor: `${catStyle.color}22`,
        borderLeftColor: catStyle.color,
        borderLeftWidth: 2,
      }}
      whileHover={{
        scale: 1.2,
        zIndex: 10,
        backgroundColor: `${catStyle.color}44`,
        borderColor: `${catStyle.color}88`,
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => selectElement(element)}
      onMouseEnter={() => setHovered(element)}
      onMouseLeave={() => setHovered(null)}
      aria-label={`${element.name}, atomic number ${element.atomicNumber}`}
    >
      <span className="text-[8px] leading-none text-white/50">
        {element.atomicNumber}
      </span>
      <span
        className="text-sm font-bold leading-tight"
        style={{ color: catStyle.color }}
      >
        {element.symbol}
      </span>
      <span className="text-[7px] leading-none text-white/40 truncate w-full text-center">
        {element.nameKo}
      </span>
    </motion.button>
  );
});
