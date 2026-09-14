import { defineConfig } from "vitest/config";
const htmlModernReporter = join(process.cwd(), "dist/reporter.js");
import { join } from "node:path";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  test: {
    name: { label: pkg.name, color: "cyan" },
    coverage: {
      enabled: true,
      reportsDirectory: "./coverage/raw",
      reporter: [
        [
          htmlModernReporter,
          {
            writeReportDataJson: true,
            fileTags: [
              { glob: "src/reporter/**", tag: "reporter" },
              { glob: "src/page/**", tag: "page" },
              { glob: "src/components/**", tag: "components" },
              { glob: "src/helpers/**", tag: "helpers" },
              { glob: "src/*.{ts,tsx}", tag: "core" },
            ],
          },
        ],
      ],
      watermarks: {
        lines: [80, 95],
        functions: [80, 95],
        branches: [80, 95],
        statements: [80, 95],
      },
    },
  },
});
