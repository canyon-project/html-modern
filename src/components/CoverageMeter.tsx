import type { FunctionalComponent as FC } from "preact";

import { getColor } from "../helpers/color";

/** Compact coverage percentage meter (antd Progress line–like). */
export const CoverageMeter: FC<{ pct: number }> = ({ pct }) => {
  const value = Number.isFinite(pct) ? Math.max(0, Math.min(100, pct)) : 0;
  const label = Number.isInteger(value) ? `${value}%` : `${value.toFixed(1)}%`;
  return (
    <div className="coverage-meter" title={label}>
      <div className="coverage-meter__track">
        <div
          className="coverage-meter__fill"
          style={{ width: `${value}%`, backgroundColor: getColor(value) }}
        />
      </div>
      <span className="coverage-meter__label">{label}</span>
    </div>
  );
};
