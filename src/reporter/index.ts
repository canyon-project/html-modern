/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import type { Context, ReportBaseOptions, ReportNode, Summarizers } from "istanbul-lib-report";

import type { FileCoverageData } from "../types.js";
import { CoverageReport } from "./coverage-report.js";
import { extractIstanbulContext } from "./istanbul-context.js";
import type { HtmlModernOptions } from "./options.js";
import { ReportBase } from "./resolve-istanbul-lib-report.js";

export type { LinkMapper, HtmlModernOptions } from "./options.js";
export type {
  CoverageData,
  GenerateOptions,
  GenerateResult,
  IstanbulReportContext,
  ReportData,
  ReportStats,
  SerializableHtmlModernOptions,
} from "./types.js";
export { CoverageReport } from "./coverage-report.js";
export { extractIstanbulContext } from "./istanbul-context.js";
export { inferProjectRoot, resolveProjectRoot } from "./infer-project-root.js";

class HtmlModernReport extends ReportBase {
  private htmlOptions: HtmlModernOptions;
  private coverage: Record<string, FileCoverageData> = {};
  private summarizer?: Summarizers;

  constructor(opts: HtmlModernOptions & Partial<ReportBaseOptions> = {}) {
    super(opts);
    this.htmlOptions = opts;
    if (opts.summarizer !== undefined) {
      this.summarizer = opts.summarizer;
    }
  }

  /** Called for each file node during tree traversal; stores a deep clone keyed by path. */
  onDetail(node: ReportNode): void {
    const fileCoverage: FileCoverageData = JSON.parse(
      JSON.stringify(node.getFileCoverage().toJSON()),
    );
    this.coverage[fileCoverage.path] = fileCoverage;
  }

  /** Called after traversal completes; generates the HTML report via {@link CoverageReport}. */
  async onEnd(_rootNode: ReportNode, context: Context): Promise<void> {
    const coverageReport = new CoverageReport(this.htmlOptions);
    await coverageReport.generate({
      coverage: this.coverage,
      targetDir: context.dir,
      sourceFinder: context.sourceFinder,
      istanbul: extractIstanbulContext(context, this.summarizer),
    });
  }
}

export default HtmlModernReport;
