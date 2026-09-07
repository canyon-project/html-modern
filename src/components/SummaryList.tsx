import type { FC } from "react";
import { useMemo, useState } from "react";

import type { DataSourceItem } from "../types";
import { CoverageMeter } from "./CoverageMeter";
import {
  SortableTh,
  highlightMatch,
  sortCoverageRows,
  type SortDir,
  type SortKey,
} from "./table-utils";

const SummaryList: FC<{
  dataSource: DataSourceItem[];
  onSelect: (path: string) => void;
  filenameKeywords: string;
}> = ({ dataSource, onSelect, filenameKeywords }) => {
  const [sortKey, setSortKey] = useState<SortKey>("path");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const rows = useMemo(
    () => sortCoverageRows(dataSource, sortKey, sortDir),
    [dataSource, sortKey, sortDir],
  );

  const onSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDir(key === "path" ? "asc" : "desc");
  };

  return (
    <div className="coverage-table-wrap">
      <table className="coverage-table">
        <thead>
          <tr>
            <SortableTh label="File" sortKey="path" activeKey={sortKey} dir={sortDir} onSort={onSort} />
            <SortableTh
              label="Total"
              sortKey="total"
              activeKey={sortKey}
              dir={sortDir}
              onSort={onSort}
              className="is-num"
            />
            <SortableTh
              label="Covered"
              sortKey="covered"
              activeKey={sortKey}
              dir={sortDir}
              onSort={onSort}
              className="is-num"
            />
            <SortableTh
              label="Coverage"
              sortKey="pct"
              activeKey={sortKey}
              dir={sortDir}
              onSort={onSort}
              className="is-coverage"
            />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.path}>
              <td>
                <button type="button" className="path-link" onClick={() => onSelect(row.path)}>
                  {highlightMatch(row.path, filenameKeywords)}
                </button>
              </td>
              <td className="is-num">{row.statements.total}</td>
              <td className="is-num">{row.statements.covered}</td>
              <td className="is-coverage">
                <CoverageMeter pct={row.statements.pct} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 ? <p className="empty-hint">No files match the current filter.</p> : null}
    </div>
  );
};

export default SummaryList;
