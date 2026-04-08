export type ElementCategory =
  | "alkali-metal"
  | "alkaline-earth"
  | "transition-metal"
  | "post-transition-metal"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble-gas"
  | "lanthanide"
  | "actinide"
  | "unknown";

export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  nameKo: string;
  atomicMass: number;
  category: ElementCategory;
  electronConfiguration: string;
  electronegativity: number | null;
  meltingPoint: number | null;
  boilingPoint: number | null;
  density: number | null;
  yearDiscovered: number | string;
  block: "s" | "p" | "d" | "f";
  group: number | null;
  period: number;
  gridColumn: number;
  gridRow: number;
  shells: number[];
  protons: number;
  neutrons: number;
}
