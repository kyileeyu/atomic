import { motion } from "motion/react";
import type { Element } from "../../types/element";
import { CATEGORY_STYLES } from "../../constants/categories";

interface InfoPanelProps {
  element: Element;
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  if (value === null || value === undefined) return null;
  return (
    <div className="flex justify-between py-1.5 border-b border-white/5">
      <span className="text-white/40 text-sm">{label}</span>
      <span className="text-white/80 text-sm font-mono">{value}</span>
    </div>
  );
}

export function InfoPanel({ element }: InfoPanelProps) {
  const catStyle = CATEGORY_STYLES[element.category];

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 h-full w-80 bg-gray-950/90 backdrop-blur-xl border-l border-white/10 overflow-y-auto z-20"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-baseline gap-3 mb-1">
            <span
              className="text-6xl font-bold"
              style={{ color: catStyle.color }}
            >
              {element.symbol}
            </span>
            <span className="text-white/30 text-lg font-mono">
              {element.atomicNumber}
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-white/90">
            {element.name}
          </h2>
          <p className="text-white/40 text-sm">{element.nameKo}</p>
          <span
            className="inline-block mt-2 rounded-full px-3 py-0.5 text-xs"
            style={{
              backgroundColor: `${catStyle.color}22`,
              color: catStyle.color,
            }}
          >
            {catStyle.labelKo}
          </span>
        </div>

        {/* Properties */}
        <div className="space-y-0">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            기본 정보
          </h3>
          <InfoRow label="원자 질량" value={`${element.atomicMass} u`} />
          <InfoRow label="블록" value={element.block.toUpperCase()} />
          <InfoRow label="주기" value={element.period} />
          <InfoRow label="족" value={element.group} />
          <InfoRow label="전자 배치" value={element.electronConfiguration} />
          <InfoRow label="전기 음성도" value={element.electronegativity} />
        </div>

        <div className="mt-4 space-y-0">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            물리적 성질
          </h3>
          <InfoRow
            label="녹는점"
            value={element.meltingPoint ? `${element.meltingPoint} K` : null}
          />
          <InfoRow
            label="끓는점"
            value={element.boilingPoint ? `${element.boilingPoint} K` : null}
          />
          <InfoRow
            label="밀도"
            value={element.density ? `${element.density} g/cm³` : null}
          />
        </div>

        <div className="mt-4 space-y-0">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            원자 구조
          </h3>
          <InfoRow label="양성자" value={element.protons} />
          <InfoRow label="중성자" value={element.neutrons} />
          <InfoRow label="전자껍질" value={element.shells.join(", ")} />
          <InfoRow label="발견 연도" value={element.yearDiscovered} />
        </div>

        {/* Shell diagram */}
        <div className="mt-6">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
            전자껍질 분포
          </h3>
          <div className="flex items-end gap-1 h-24">
            {element.shells.map((count, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-white/50">{count}</span>
                <div
                  className="w-full rounded-sm"
                  style={{
                    height: `${(count / 32) * 100}%`,
                    minHeight: "4px",
                    backgroundColor: `hsl(${190 + i * 20}, 80%, 60%)`,
                    opacity: 0.7,
                  }}
                />
                <span className="text-[9px] text-white/30">
                  {["K", "L", "M", "N", "O", "P", "Q"][i] || `${i + 1}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
