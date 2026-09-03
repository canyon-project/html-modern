# @canyonjs/html-modern

Modern Istanbul HTML coverage report React component library.

## Install

Peer dependencies must be installed in your app:

```bash
pnpm add @canyonjs/html-modern react react-dom antd @ant-design/icons monaco-editor react-highlight-words
```

Also import Monaco editor styles in your app entry (required for the code viewer):

```ts
import "monaco-editor/min/vs/editor/editor.main.css";
```

## Usage

```tsx
import { ReportApp, buildReportFiles } from "@canyonjs/html-modern";
import "@canyonjs/html-modern/style.css";
```

## Scripts

```bash
pnpm install
pnpm build      # dist/index.js + dist/style.css
pnpm play       # UI playground (uses coverage/report-data.json)
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
playground/    # local dev playground
coverage/      # sample report-data.json for playground
```
