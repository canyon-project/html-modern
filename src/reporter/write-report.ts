import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

import { compress } from "./compress.js";
import type { ReportData } from "./types.js";

const require = createRequire(import.meta.url);

/** Must stay in sync with `report-data-placeholder.ts` at package root. */
export const REPORT_DATA_PLACEHOLDER = "__REPORT_DATA__";

export function resolveReportHtmlDist(): string | null {
  try {
    const packageJsonPath = require.resolve("@canyonjs/html-modern/package.json");
    const distDir = path.join(path.dirname(packageJsonPath), "dist");
    const pageDir = path.join(distDir, "page");
    if (fs.existsSync(path.join(pageDir, "index.html"))) {
      return pageDir;
    }
  } catch {
    // @canyonjs/html-modern is not installed or dist/page is missing
  }

  return null;
}

function serializeReportData(reportData: ReportData): string {
  return `'${compress(JSON.stringify(reportData))}'`;
}

export function writeReportDataJson(reportData: ReportData, targetDir: string): string {
  const reportDataJsonPath = path.join(targetDir, "report-data.json");
  fs.writeFileSync(reportDataJsonPath, JSON.stringify(reportData, null, 2), "utf-8");

  return reportDataJsonPath;
}

export function writeHtmlReport(
  reportData: ReportData,
  targetDir: string,
  reportHtmlDist: string,
): string {
  const template = fs.readFileSync(path.join(reportHtmlDist, "index.html"), "utf-8");
  if (!template.includes(REPORT_DATA_PLACEHOLDER)) {
    throw new Error(`HTML template missing ${REPORT_DATA_PLACEHOLDER} placeholder`);
  }

  const html = template.replace(REPORT_DATA_PLACEHOLDER, serializeReportData(reportData));
  const htmlReportPath = path.join(targetDir, "index.html");
  fs.writeFileSync(htmlReportPath, html, "utf-8");

  return htmlReportPath;
}
