import { javascript } from "@codemirror/lang-javascript";
import { defaultHighlightStyle, syntaxHighlighting } from "@codemirror/language";
import type { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

/** Map coverage file paths to CodeMirror language extensions (JS/TS only). */
export function languageExtensionFromPath(filePath: string): Extension {
  const ext = filePath.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "ts":
    case "mts":
    case "cts":
    case "tsx":
      return javascript({ typescript: true, jsx: ext === "tsx" });
    case "js":
    case "mjs":
    case "cjs":
    case "jsx":
      return javascript({ jsx: ext === "jsx" });
    default:
      return [];
  }
}

export const coverageHighlight = syntaxHighlighting(defaultHighlightStyle, { fallback: true });

const editorChrome = {
  "&": {
    height: "100%",
    fontSize: "12px",
  },
  ".cm-scroller": {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
    lineHeight: "18px",
    overflow: "auto",
  },
  ".cm-content": {
    padding: "0",
    caretColor: "transparent",
  },
  ".cm-gutters": {
    border: "none",
    backgroundColor: "var(--report-bg)",
  },
  ".cm-coverage-gutter": {
    minWidth: "auto",
  },
  ".cm-coverage-gutter .cm-gutterElement": {
    padding: "0 4px 0 0",
  },
  ".cm-tooltip.cm-tooltip-hover": {
    backgroundColor: "var(--report-decoration-bg)",
    color: "var(--report-decoration-text)",
    border: "none",
    borderRadius: "4px",
    padding: "4px 8px",
    fontSize: "12px",
  },
} as const;

export const lightEditorTheme = EditorView.theme(editorChrome, { dark: false });

export const darkEditorTheme = EditorView.theme(
  {
    ...editorChrome,
    "&": {
      ...editorChrome["&"],
      backgroundColor: "var(--report-bg)",
      color: "var(--report-text)",
    },
    ".cm-gutters": {
      ...editorChrome[".cm-gutters"],
      color: "var(--report-line-coverage-text)",
    },
  },
  { dark: true },
);
