import { buildReportFiles, ReportApp } from "@canyonjs/html-modern";
import type { FileCoverageData, FileTagRule } from "@canyonjs/html-modern";

import "@canyonjs/html-modern/style.css";
import reportData from "@repo/fixtures/report-data.json";
import { useMemo } from "preact/hooks";

import { resolveFileTags } from "../../src/reporter/resolve-file-tags";
import { toRelativePath } from "../../src/paths";

const playgroundFileTags: FileTagRule[] = [
  { glob: "src/**", tag: "src" },
  { glob: "src/reporter/**", tag: "reporter" },
  { glob: "src/components/**", tag: "ui" },
  { glob: "test/**", tag: "tests" },
];

export function App() {
  const prepared = useMemo(() => {
    const built = buildReportFiles({
      projectRoot: reportData.projectRoot,
      coverage: reportData.coverage as Record<string, FileCoverageData>,
      sources: reportData.sources,
      fileTagRules: playgroundFileTags,
    });

    const relativePaths = built.files.map((file) => toRelativePath(file.path, built.projectRoot));
    const fileTagsByPath = resolveFileTags(relativePaths, playgroundFileTags);

    return {
      ...built,
      fileTagRules: playgroundFileTags,
      fileTagsByPath,
    };
  }, []);

  return (
    <ReportApp
      files={prepared.files}
      projectRoot={prepared.projectRoot}
      name={prepared.name || "playground"}
      fileTagRules={prepared.fileTagRules}
      fileTagsByPath={prepared.fileTagsByPath}
    />
  );
}
