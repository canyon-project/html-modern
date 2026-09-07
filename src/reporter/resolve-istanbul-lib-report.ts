import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const PEERS = ["@vitest/istanbul-lib-report", "istanbul-lib-report"] as const;

type IstanbulLibReport = typeof import("istanbul-lib-report");

/** Resolve whichever istanbul-lib-report peer the host project installed. */
export function resolveIstanbulLibReport(): IstanbulLibReport {
  for (const name of PEERS) {
    try {
      return require(name) as IstanbulLibReport;
    } catch {
      // try next peer
    }
  }

  throw new Error(
    'Cannot resolve istanbul-lib-report. Install peer dependency "istanbul-lib-report" or "@vitest/istanbul-lib-report".',
  );
}

export const { ReportBase } = resolveIstanbulLibReport();
