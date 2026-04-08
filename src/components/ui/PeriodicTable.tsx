import { elements } from "../../data/elements";
import { ElementCell } from "./ElementCell";

export function PeriodicTable() {
  return (
    <div className="flex flex-col items-center gap-2 p-4 w-full max-w-[1200px] mx-auto">
      {/* Main table */}
      <div
        className="grid gap-[3px] w-full"
        style={{
          gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
          gridTemplateRows: "repeat(7, minmax(0, 1fr)) auto repeat(2, minmax(0, 1fr))",
        }}
      >
        {/* Period 6-7 lanthanide/actinide indicators */}
        <div
          className="flex items-center justify-center text-[9px] text-white/30"
          style={{ gridColumn: 3, gridRow: 6 }}
        >
          57-71
        </div>
        <div
          className="flex items-center justify-center text-[9px] text-white/30"
          style={{ gridColumn: 3, gridRow: 7 }}
        >
          89-103
        </div>

        {/* Spacer row between main table and lanthanides/actinides */}
        <div style={{ gridColumn: "1 / -1", gridRow: 8, height: "8px" }} />

        {elements.map((el) => (
          <ElementCell key={el.atomicNumber} element={el} />
        ))}
      </div>
    </div>
  );
}
