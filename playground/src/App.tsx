import reportData from "@repo/fixtures/report-data.json";
import { buildReportFiles, ReportApp } from "@canyonjs/html-modern";

import "@canyonjs/html-modern/style.css";
import type { FileCoverageData } from "@canyonjs/html-modern";
import { useMemo } from "preact/hooks";

export function App() {
  const prepared = useMemo(
    () =>
      buildReportFiles({
        projectRoot: reportData.projectRoot,
        coverage: reportData.coverage as Record<string, FileCoverageData>,
        sources: reportData.sources,
      }),
    [],
  );

  return (
    <ReportApp
      files={prepared.files}
      projectRoot={prepared.projectRoot}
      name={prepared.name || "playground"}
    />
  );
}
