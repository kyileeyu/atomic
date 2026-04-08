import type { ElementCategory } from "../types/element";

export interface CategoryStyle {
  label: string;
  labelKo: string;
  bg: string;
  hex: number;
  textColor: string;
}

export const CATEGORY_STYLES: Record<ElementCategory, CategoryStyle> = {
  "alkali-metal": {
    label: "Alkali Metal",
    labelKo: "알칼리 금속",
    bg: "bg-alkali-metal/20",
    hex: 0xef4444,
    textColor: "text-alkali-metal",
  },
  "alkaline-earth": {
    label: "Alkaline Earth",
    labelKo: "알칼리 토금속",
    bg: "bg-alkaline-earth/20",
    hex: 0xf97316,
    textColor: "text-alkaline-earth",
  },
  "transition-metal": {
    label: "Transition Metal",
    labelKo: "전이 금속",
    bg: "bg-transition-metal/20",
    hex: 0xeab308,
    textColor: "text-transition-metal",
  },
  "post-transition-metal": {
    label: "Post-transition Metal",
    labelKo: "전이후 금속",
    bg: "bg-post-transition-metal/20",
    hex: 0x84cc16,
    textColor: "text-post-transition-metal",
  },
  metalloid: {
    label: "Metalloid",
    labelKo: "준금속",
    bg: "bg-metalloid/20",
    hex: 0x22c55e,
    textColor: "text-metalloid",
  },
  nonmetal: {
    label: "Nonmetal",
    labelKo: "비금속",
    bg: "bg-nonmetal/20",
    hex: 0x06b6d4,
    textColor: "text-nonmetal",
  },
  halogen: {
    label: "Halogen",
    labelKo: "할로겐",
    bg: "bg-halogen/20",
    hex: 0x3b82f6,
    textColor: "text-halogen",
  },
  "noble-gas": {
    label: "Noble Gas",
    labelKo: "비활성 기체",
    bg: "bg-noble-gas/20",
    hex: 0xa855f7,
    textColor: "text-noble-gas",
  },
  lanthanide: {
    label: "Lanthanide",
    labelKo: "란타넘족",
    bg: "bg-lanthanide/20",
    hex: 0xec4899,
    textColor: "text-lanthanide",
  },
  actinide: {
    label: "Actinide",
    labelKo: "악티늄족",
    bg: "bg-actinide/20",
    hex: 0xf43f5e,
    textColor: "text-actinide",
  },
  unknown: {
    label: "Unknown",
    labelKo: "미확인",
    bg: "bg-unknown/20",
    hex: 0x6b7280,
    textColor: "text-unknown",
  },
};
