import type { Extension } from "@codemirror/state";
import { gutter, GutterMarker } from "@codemirror/view";

export interface LineState {
  lineNumber: number;
  hit: number;
}

function hitBackground(hit: number): string {
  if (hit > 0) {
    return "var(--report-line-hit-covered)";
  }
  if (hit === 0) {
    return "var(--report-line-hit-uncovered)";
  }
  return "var(--report-line-hit-neutral)";
}

/** Render coverage line-number gutter HTML for a single line. */
export function renderLineNumberGutter(lineNumber: number, linesState: LineState[]): string {
  const line = linesState.find((item) => item.lineNumber === lineNumber) ?? {
    hit: -1,
    lineNumber,
  };

  const maxHit = Math.max(0, ...linesState.map((item) => item.hit));
  const digitWidth = maxHit.toString().length;
  const maxHitWidth = (digitWidth + 2) * 7.2;
  const hitLabel = line.hit > 0 ? `${line.hit}x` : "";

  return `<div class="line-number-wrapper"><span class="line-number">${lineNumber}</span><span class="line-coverage" style="background:${hitBackground(line.hit)};width:${maxHitWidth}px">${hitLabel}</span></div>`;
}

class CoverageGutterMarker extends GutterMarker {
  constructor(
    readonly lineNumber: number,
    readonly hit: number,
    readonly html: string,
  ) {
    super();
  }

  eq(other: CoverageGutterMarker): boolean {
    return this.lineNumber === other.lineNumber && this.hit === other.hit;
  }

  toDOM(): HTMLElement {
    const wrap = document.createElement("div");
    wrap.innerHTML = this.html;
    return (wrap.firstElementChild as HTMLElement | null) ?? wrap;
  }
}

/** CodeMirror gutter showing line numbers + hit counts. */
export function coverageLineGutter(linesState: LineState[]): Extension {
  const byLine = new Map(linesState.map((line) => [line.lineNumber, line]));

  return gutter({
    class: "cm-coverage-gutter",
    lineMarker(view, line) {
      const lineNumber = view.state.doc.lineAt(line.from).number;
      const hit = byLine.get(lineNumber)?.hit ?? -1;
      return new CoverageGutterMarker(lineNumber, hit, renderLineNumberGutter(lineNumber, linesState));
    },
  });
}
