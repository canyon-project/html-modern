import { defineConfig } from "tsdown";

/** React component library → `dist/index.js` + `dist/style.css` */
export default defineConfig([
  {
    entry: ["src/index.ts"],
    platform: "neutral",
    dts: true,
    exports: true,
    clean: true,
  },
  {
    entry: {
      reporter: "src/reporter/index.ts",
    },
    platform: "node",
    fixedExtension: false,
    dts: true,
    exports: true,
    clean: false,
  },
]);
