import { create } from "zustand";
import type { Element, ElementCategory } from "../types/element";

interface AppState {
  viewMode: "table" | "atom" | "transitioning";
  selectedElement: Element | null;
  hoveredElement: Element | null;
  searchQuery: string;
  activeCategory: ElementCategory | null;

  selectElement: (el: Element) => void;
  clearSelection: () => void;
  setHovered: (el: Element | null) => void;
  setSearchQuery: (q: string) => void;
  setActiveCategory: (cat: ElementCategory | null) => void;
  setViewMode: (mode: "table" | "atom" | "transitioning") => void;
}

export const useAppStore = create<AppState>((set) => ({
  viewMode: "table",
  selectedElement: null,
  hoveredElement: null,
  searchQuery: "",
  activeCategory: null,

  selectElement: (el) =>
    set({ selectedElement: el, viewMode: "transitioning" }),

  clearSelection: () =>
    set({ selectedElement: null, viewMode: "table" }),

  setHovered: (el) => set({ hoveredElement: el }),

  setSearchQuery: (q) => set({ searchQuery: q }),

  setActiveCategory: (cat) =>
    set((state) => ({
      activeCategory: state.activeCategory === cat ? null : cat,
    })),

  setViewMode: (mode) => set({ viewMode: mode }),
}));
