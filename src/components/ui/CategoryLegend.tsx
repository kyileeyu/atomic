import type { ElementCategory } from "../../types/element";
import { CATEGORY_STYLES } from "../../constants/categories";
import { useAppStore } from "../../store/useAppStore";

const categories: ElementCategory[] = [
  "nonmetal",
  "noble-gas",
  "alkali-metal",
  "alkaline-earth",
  "metalloid",
  "halogen",
  "transition-metal",
  "post-transition-metal",
  "lanthanide",
  "actinide",
  "unknown",
];

export function CategoryLegend() {
  const activeCategory = useAppStore((s) => s.activeCategory);
  const setActiveCategory = useAppStore((s) => s.setActiveCategory);

  return (
    <div className="flex flex-wrap justify-center gap-2 px-4">
      {categories.map((cat) => {
        const style = CATEGORY_STYLES[cat];
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] transition-all border ${
              isActive
                ? "border-white/30 bg-white/10"
                : "border-transparent bg-white/5 hover:bg-white/10"
            }`}
          >
            <span
              className={`inline-block h-2 w-2 rounded-full ${style.bg.replace("/20", "")}`}
            />
            <span className="text-white/60">{style.labelKo}</span>
          </button>
        );
      })}
    </div>
  );
}
