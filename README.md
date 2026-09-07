# @canyonjs/html-modern

Modern Istanbul HTML coverage report: React component library + single-file HTML page.

## Install

Peer dependencies must be installed in your app:

```bash
pnpm add @canyonjs/html-modern react react-dom \
  @codemirror/view @codemirror/state @codemirror/language @codemirror/lang-javascript
```

## Usage (React library)

```tsx
import { ReportApp, buildReportFiles } from "@canyonjs/html-modern";
import "@canyonjs/html-modern/style.css";
```

## Single-file HTML page

`pnpm build` also emits `dist/page/index.html` (JS/CSS inlined via `vite-plugin-singlefile`).
At report generation time, replace `__REPORT_DATA__` in that file with the serialized coverage payload.

## Scripts

```bash
pnpm install
pnpm build      # dist/index.js + dist/style.css + dist/page/index.html
pnpm play       # UI playground (uses coverage/report-data.json)
pnpm dev        # single-file page Vite dev server
pnpm test       # unit tests
pnpm typecheck
```

## Release

Push to `main` triggers `.github/workflows/publish.yml`: typecheck → test → build → `npm publish`.

1. Bump `version` in `package.json`
2. Commit and push to `main`
3. If that version is not on npm yet, the workflow publishes `@canyonjs/html-modern`

### npm setup (one-time)

1. Create an npm [Automation token](https://www.npmjs.com/settings/~your-user/tokens) with **Publish** access for `@canyonjs`
2. In GitHub repo **Settings → Secrets and variables → Actions**, add `NPM_TOKEN`
3. Ensure the `@canyonjs` org on npm allows publishing this package name

## Layout

```
src/           # React component library (tsdown → dist/)
src/page/      # single-file HTML page (vite → dist/page/)
playground/    # local dev playground
coverage/      # sample report-data.json for playground / page dev
```
