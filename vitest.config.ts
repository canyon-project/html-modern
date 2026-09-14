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
      reporter: [htmlModernReporter,{
        fileTags: [
          { glob: "src/payments/**", tag: "payments" },
          { glob: "src/auth/**", tag: "auth" },
          { glob: "**/critical/**", tag: "P0" },
        ],
      }],
    },
  },
});
