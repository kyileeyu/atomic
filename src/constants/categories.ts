import type { ElementCategory } from "../types/element";

export interface CategoryStyle {
  label: string;
  labelKo: string;
  color: string;
  hex: number;
}

export const CATEGORY_STYLES: Record<ElementCategory, CategoryStyle> = {
  "alkali-metal": {
    label: "Alkali Metal",
    labelKo: "알칼리 금속",
    color: "#ef4444",
    hex: 0xef4444,
  },
  "alkaline-earth": {
    label: "Alkaline Earth",
    labelKo: "알칼리 토금속",
    color: "#f97316",
    hex: 0xf97316,
  },
  "transition-metal": {
    label: "Transition Metal",
    labelKo: "전이 금속",
    color: "#eab308",
    hex: 0xeab308,
  },
  "post-transition-metal": {
    label: "Post-transition Metal",
    labelKo: "전이후 금속",
    color: "#84cc16",
    hex: 0x84cc16,
  },
  metalloid: {
    label: "Metalloid",
    labelKo: "준금속",
    color: "#22c55e",
    hex: 0x22c55e,
  },
  nonmetal: {
    label: "Nonmetal",
    labelKo: "비금속",
    color: "#06b6d4",
    hex: 0x06b6d4,
  },
  halogen: {
    label: "Halogen",
    labelKo: "할로겐",
    color: "#3b82f6",
    hex: 0x3b82f6,
  },
  "noble-gas": {
    label: "Noble Gas",
    labelKo: "비활성 기체",
    color: "#a855f7",
    hex: 0xa855f7,
  },
  lanthanide: {
    label: "Lanthanide",
    labelKo: "란타넘족",
    color: "#ec4899",
    hex: 0xec4899,
  },
  actinide: {
    label: "Actinide",
    labelKo: "악티늄족",
    color: "#f43f5e",
    hex: 0xf43f5e,
  },
  unknown: {
    label: "Unknown",
    labelKo: "미확인",
    color: "#6b7280",
    hex: 0x6b7280,
  },
};
