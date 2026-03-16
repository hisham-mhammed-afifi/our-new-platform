# Our New Platform

A micro-frontend platform built with **Angular 21**, **Nx**, and **Module Federation**.

Each app is independently deployable. The shell composes them at runtime.

## Architecture

```
apps/
  shell/          → Host application            :4200
  settings/       → Settings remote             :4201
  playground/     → Playground remote            :4202
  auth/           → Auth remote                  :4203

libs/
  ui/             → Shared UI components (Button, ...)
  design-system/  → 7-1 SASS design tokens, light/dark themes
  testing/        → Route testing utilities
```

## Getting Started

```bash
npm install
npx nx serve shell
```

The shell starts at `http://localhost:4200` and loads remotes on demand.

## Commands

| Command | Description |
|---|---|
| `npx nx serve shell` | Start the full platform |
| `npx nx serve settings` | Start settings standalone (+ shell) |
| `npx nx test <project>` | Run unit tests (Vitest) |
| `npx nx lint <project>` | Lint a project |
| `npx nx run-many -t test` | Test all projects |
| `npx nx graph` | Visualize dependency graph |

## Theming

The design system supports light and dark themes via CSS custom properties.

```html
<!-- Auto-detect from OS preference (default) -->
<html>

<!-- Force a theme -->
<html data-theme="dark">
<html data-theme="light">
```

Toggle at runtime by setting `data-theme` on `<html>`. The shell navbar includes a built-in toggle.

## Tech Stack

Angular 21 | Nx 22 | Module Federation | Vitest | SCSS | Playwright (e2e)

## License

MIT
