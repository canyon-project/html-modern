import { type FC, useEffect, useId, useMemo, useRef, useState } from "react";

import CoverageDetail from "./components/CoverageDetail";
import SummaryHeader from "./components/SummaryHeader";
import SummaryList from "./components/SummaryList";
import SummaryTree from "./components/SummaryTree";
import TopControl from "./components/TopControl";
import { deriveSummaryViews } from "./helpers/derive-views";
import { emptyFileCoverage } from "./helpers/empty-coverage";
import { ThemeProvider, useTheme } from "./theme-context";
import type { FileCoverageData, ReportProps } from "./types";

const ReportContent: FC<ReportProps> = ({ value, name, dataSource, onSelect }) => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [filenameKeywords, setFilenameKeywords] = useState("");
  const [showMode, setShowMode] = useState("tree");
  const [fileCoverage, setFileCoverage] = useState<FileCoverageData>(emptyFileCoverage);
  const [fileContent, setFileContent] = useState("");
  const rootId = useId().replaceAll(":", "");
  const rootClassName = `report-scope-${rootId} istanbul-html-modern`;
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const requestSelect = (path: string) => {
    void onSelectRef.current(path);
  };

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    void onSelectRef
      .current(value)
      .then((res) => {
        if (cancelled) {
          return;
        }
        setFileContent(res.fileContent);
        setFileCoverage(res.fileCoverage);
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [value]);

  const isFile = useMemo(() => dataSource.some((item) => item.path === value), [dataSource, value]);
  const mode = isFile ? "file" : showMode;
  const isFileDataReady = isFile && !isLoading;

  const { treeDataSource, rootDataSource, listDataSource } = useMemo(
    () =>
      deriveSummaryViews({
        dataSource,
        filenameKeywords,
        value,
      }),
    [dataSource, value, filenameKeywords],
  );

  return (
    <div className={rootClassName}>
      <TopControl
        filenameKeywords={filenameKeywords}
        showMode={showMode}
        onChangeShowMode={setShowMode}
        total={listDataSource.length}
        onChangeKeywords={setFilenameKeywords}
      />
      <SummaryHeader
        reportName={name}
        data={rootDataSource}
        value={value}
        onSelect={requestSelect}
      />

      {mode === "file" ? (
        <div className="report-editor-body">
          {isFileDataReady ? (
            <CoverageDetail source={fileContent} coverage={fileCoverage} theme={theme} />
          ) : (
            <div className="report-loading" role="status">
              Loading file…
            </div>
          )}
        </div>
      ) : (
        <div className="report-scroll-body">
          {mode === "tree" && (
            <SummaryTree dataSource={treeDataSource} onSelect={requestSelect} />
          )}
          {mode === "list" && (
            <SummaryList
              dataSource={listDataSource}
              onSelect={requestSelect}
              filenameKeywords={filenameKeywords}
            />
          )}
        </div>
      )}
    </div>
  );
};

export const Report: FC<ReportProps> = (props) => (
  <ThemeProvider>
    <ReportContent {...props} />
  </ThemeProvider>
);

export default Report;
export type { ReportProps };
