import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const packageRoot = dirname(fileURLToPath(import.meta.url));

/** UI playground (consumes the public library API). */
export default defineConfig({
  root: join(packageRoot, "playground"),
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@canyonjs/html-modern/style.css",
        replacement: join(packageRoot, "src/index.css"),
      },
      {
        find: "@canyonjs/html-modern",
        replacement: join(packageRoot, "src/index.ts"),
      },
      {
        find: "@repo/fixtures",
        replacement: join(packageRoot, "coverage"),
      },
    ],
  },
  optimizeDeps: {
    include: ["@ant-design/icons", "antd", "react-dom/server", "react-highlight-words"],
  },
  server: {
    port: 30614,
  },
});
