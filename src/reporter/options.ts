import type { ReportNode } from "istanbul-lib-report";

import type { FileTagRule } from "../file-tags.js";

export type { FileTagRule };

/** maps report nodes to output paths (reserved; not used by the modern single-file writer) */
export interface LinkMapper {
  getPath(node: ReportNode | string): string;
  relativePath(source: ReportNode | string, target: ReportNode | string): string;
  assetPath(node: ReportNode, name: string): string;
}

/** options accepted by {@link HtmlModernReport} */
export interface HtmlModernOptions {
  /** show extra logging while the report is generated */
  verbose?: boolean;
  /** maps report nodes to output paths (reserved; not used by the modern single-file writer) */
  linkMapper?: LinkMapper;
  /** subdirectory under the report dir (reserved for parity with classic html) */
  subdir?: string;
  /** skip nodes with no coverage */
  skipEmpty?: boolean;
  /** the metrics to show in the report UI, defaults to lines, branches and functions */
  metricsToShow?: ("lines" | "branches" | "functions" | "statements")[];
  /**
   * Project root used to relativize coverage paths in the UI.
   * Defaults to the common parent of coverage file directories (see
   * {@link inferProjectRoot}), falling back to `process.cwd()`.
   */
  projectRoot?: string;
  /** write `report-data.json` alongside `index.html` in the report output directory */
  writeReportDataJson?: boolean;
  /** tag rules used to filter files in the HTML report UI */
  fileTags?: FileTagRule[];
}
