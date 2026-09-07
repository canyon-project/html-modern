import type { FC } from "react";

import { getColor } from "../helpers/color";

/** Compact coverage percentage meter. */
export const CoverageMeter: FC<{ pct: number }> = ({ pct }) => {
  const value = Number.isFinite(pct) ? Math.max(0, Math.min(100, pct)) : 0;
  return (
    <div className="coverage-meter" title={`${value}%`}>
      <div className="coverage-meter__track">
        <div
          className="coverage-meter__fill"
          style={{ width: `${value}%`, backgroundColor: getColor(value) }}
        />
      </div>
      <span className="coverage-meter__label">{value}%</span>
    </div>
  );
};
