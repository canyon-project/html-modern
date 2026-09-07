import type { FC } from "react";
import { useMemo, useState } from "react";

import type { DataSourceItem } from "../types";
import { CoverageMeter } from "./CoverageMeter";
import { SortableTh, sortCoverageRows, type SortDir, type SortKey } from "./table-utils";

function isSourceFile(path: string): boolean {
  return /\.(js|jsx|ts|tsx|mjs|cjs|mts|cts|vue|json|css|scss|less|html|md)$/i.test(path);
}

function FileIcon() {
  return (
    <svg className="path-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="path-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SummaryTree: FC<{
  dataSource: DataSourceItem[];
  onSelect: (path: string) => void;
}> = ({ dataSource, onSelect }) => {
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
          {rows.map((row) => {
            const name = row.path.split("/").at(-1) || row.path;
            return (
              <tr key={row.path}>
                <td>
                  <button type="button" className="path-link" onClick={() => onSelect(row.path)}>
                    {isSourceFile(row.path) ? <FileIcon /> : <FolderIcon />}
                    <span>{name}</span>
                  </button>
                </td>
                <td className="is-num">{row.statements.total}</td>
                <td className="is-num">{row.statements.covered}</td>
                <td className="is-coverage">
                  <CoverageMeter pct={row.statements.pct} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {rows.length === 0 ? <p className="empty-hint">No entries in this directory.</p> : null}
    </div>
  );
};

export default SummaryTree;
