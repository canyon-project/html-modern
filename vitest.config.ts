import { defineConfig } from "vitest/config";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  test: {
    name: { label: pkg.name, color: "cyan" },
      coverage:{
        enabled:true,
          reporter:'html',
      }
  },
});
