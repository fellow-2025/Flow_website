# AGENTS GUIDE

This repo hosts the FLOW landing site built with Astro + React/Three integrations. The guidance below helps any agent work safely and consistently: install deps, run builds, inspect components, and reason about style rules before touching code.

## 1. Environment Setup & Tooling

- **Node toolchain**: the project targets Node 22.13.1 via Volta (`package.json`). Respect that version when adding tooling or CI steps.
- **Package manager**: use `npm`. The lockfile is `package-lock.json`, so do not switch to pnpm/yarn without explicit instruction.
- **TypeScript + Astro**: sources live under `src/`; Astro files mix `.astro`, `.tsx`, and `.ts` islands.
- **Third-party integrations**: the project uses React, Tailwind, Three.js, P5, and Cloudflare/Netlify adapters. New dependencies must align with the existing ESM expectations.
- **Font handling**: `@fontsource/source-sans-pro` is bundled; custom fonts load via `public/fonts`. Add new fonts under `public/` and reference them inside layouts or global styles as needed.

## 2. Build / Dev / Diagnostic Commands

Run every command from the repo root unless noted otherwise.

| Task | Command | Notes |
| ---- | ------- | ----- |
| Install dependencies | `npm install` | Always run after changing `package.json` or lockfile. |
| Local dev server | `npm run dev` | Serves on `localhost:4321` by default. |
| Dev server exposed to host | `npm run devExpose` | `--host 0.0.0.0` for containerized environments. |
| Production build | `npm run build` | Executes `astro check && astro build`. |
| Preview build | `npm run preview` | Serves the built `./dist` output for manual QA. |
| Astro CLI | `npm run astro -- <astro-command>` | Run helpers such as `astro check`, `astro sync`, or `astro add`. |

### 2.1 Running a Single Test / Check

- There is no automated `npm test` script. Instead, run the scoped Astro check against files you change:

  ```bash
  npm run astro -- check src/pages/links.astro
  ```

  Replace the path with the file or directory you updated. `astro check` enforces TypeScript/JSX validity and lint-level rules when run this way.

## 3. Cursor & Copilot Rules

- This repo does not yet contain `.cursor/rules/` or `.cursorrules`. No cursor-specific instructions are required.
- There is no `.github/copilot-instructions.md`. Continue using Copilot/per-agent helpers as usual.

## 4. Code Style & Architecture Guidelines

These rules describe how the current sources are structured, how to keep new code consistent, and how to handle common concerns.

### 4.1 General Formatting

- **Whitespace**: Indent with tabs inside Astro templates and JSX fragments where existing files already use tabs (see `src/pages/index.astro`), but prefer two spaces for TypeScript/utility files for readability. Keep consistent per-file.
- **Line breaks**: Keep `<style>` blocks or `<script>` sections adjacent to their Astro markup; avoid sprawling 400+ line blocks unless they belong to a major layout or animation definition.
- **Astro frontmatter**: Use the top `---` boundary with imports and component props defined in PascalCase `interface` declarations. Destructure `Astro.props` explicitly for clarity (see `Layout.astro`).
- **HTML attributes**: Use double quotes inside template markup. Keep indentation level consistent with Astro’s HTML structure.

### 4.2 Imports & Module Organization

- **Order**: Group imports as (1) external packages, (2) scoped helpers (e.g., `import { Icon }`), (3) local components/paths. Separate groups with blank lines.
- **Extensions**: Omit file extensions for `.astro`, `.ts`, `.tsx`, and `.js` imports when bundler resolves them; explicitly include them only when necessary (e.g., `Icon` component import already omits `.tsx`).
- **Type-only imports**: Use TypeScript `import type { Something } from './...'` for interfaces/types that don't emit runtime code (e.g., `Props3d`).
- **Image/font assets**: Load assets from `public/` using absolute paths (`/images/...`). Keep them out of `src/` unless they represent inline data or metadata.

### 4.3 Types & Naming Conventions

- **Naming**: Use PascalCase for components (`Layout`, `Card`, `ThreeBackground`), camelCase for variables/functions, and TITLE_CASE for constants only when representing enums or config objects.
- **Interfaces/Types**: Name props interfaces as `Props` or domain-specific labels (e.g., `Props3d`, `simplePalette`). Keep them near the component they describe.
- **Readonly & const**: Favor `const` for all bindings unless reassignment is required. When you have arrays or objects that should not be mutated, use `readonly` modifiers or `as const` if appropriate.
- **Default exports**: Prefer named exports; include `export const` for shared helpers. Components may default-export only when they represent the primary widget (e.g., `export const ThreeBackground`).

### 4.4 Styling & Layout

- **Tailwind**: Tailwind is used inside class attributes. Continue combining utility classes in the markup instead of extracting them unless they repeat frequently.
- **Scoped `<style>`**: Use scoped `<style>` blocks for component-specific tweaks (see `IconCard.astro`). When you need global adjustments, use `<style is:global>` or place them in `src/styles` (none yet – create one if needed).
- **Animation/timings**: Define keyframes within the component that uses them; annotate them with comment blocks or a tool name (e.g., Animista) for future reference.
- **Dark mode**: There is no global dark layout; components that need alternate visuals should take a prop (`dark`) and toggle class lists accordingly.

### 4.5 Error Handling & State

- **Runtime safety**: Checks happen in effect hooks (see `ThreeBackground`). Always verify DOM refs before using them (`if (!canvRef.current) return`).
- **Cleanup**: Dispose Three.js resources inside cleanup functions returned from `useEffect`. Clean up event listeners, animation frames, and renderer instances explicitly.
- **Errors**: Prefer early returns for invalid props or missing data. Avoid throwing inside components unless constructing fatal errors (e.g., `throw new Error('...')`).

### 4.6 React/Three.js Patterns

- **Effect dependencies**: Keep `useEffect` dependency arrays accurate and minimal. Use stable refs or memoized callbacks when you need to re-run Three.js initialization safely.
- **Managers & helpers**: Three.js logic is split into managers (`GrassManager`, `PropObjManager`). Extend these helpers rather than stuffing more logic in the React component. They expose `tick`/`dispose` methods—call them consistently.
- **Animation loops**: Manage the animation frame via `requestAnimationFrame`. Store the ID (`frId`) so the cleanup function can cancel it and prevent leaks.
- **Pointer handling**: Use dedicated utilities (`addPointerHandler`, `cleanupPointerHandler`). Keep pointer state outside of render loops when possible.

### 4.7 Project-specific conventions

- **Pages & routes**: Files under `src/pages/` map to routes. Capitalize story sections (e.g., `events/volX.astro`) only where needed; keep route filenames lowercase.
- **Containers/layouts**: Layouts accept props for `title`, `desc`, and `favicon`. Always provide these props for new pages to maintain SEO metadata.
- **Components**: Most presentational components (e.g., `Card`, `Container`, `About`) follow a pattern: accept props, render markup, and include scoped styles directly below the template.

### 4.8 Documentation & Comments

- Keep comments brief and reasoned. Avoid repeating what the code already expresses—explain “why” instead of “what.”
- Preserve TODOs with Japanese notes when they explain a backlog (the repo mixes Japanese/English). Translate only when you’re confident about the context.

## 5. Working with Large Assets

- **Images & media**: Store high-res files under `public/images`. Use WebP when possible; fallback to PNG/JPEG as needed. Keep alt text meaningful.
- **Three.js assets**: Manage textures (if any) under `public/textures`. Always document new assets in `AGENTS.md` or a dedicated README if they change rendering behavior.

## 6. Collaboration Protocol

- Before pushing, run `npm run build` and `npm run astro -- check`. Include a short note in your summary about the checks you ran.
- If you add new CLI scripts (e.g., `test`, `lint`), update this AGENTS guide with descriptions and usage examples.
- Mention any manual verification steps in your final response when handing work back to a human reviewer.

Thanks for keeping the FLOW site vibrant. Let me know if you need any more context!

## 7. Directory Orientation

- `src/pages/`: route files; keep filenames lowercase unless the route intentionally exposes uppercase characters (e.g., event sections). Merge layout props and presentation in the same file to minimize shaking between route and component.
- `src/layouts/`: reusable wrappers that handle metadata, navigation, and consistent page scaffolding. Always pass `title`, `desc`, and `favicon` through props when composing layouts.
- `src/components/`: presentational parts such as cards, grids, and statements. Keep logic minimal inside these files and rely on props to drive view state.
- `src/islands/`: React/Three islands executed on the client; manage effect lifecycles carefully because these are hydration entry points.
- `src/styles/`: currently empty; if you create this directory for global/shared styles, place resets or theme tokens here and import them where needed.
- `public/`: static assets served as-is. Reference them with absolute paths (`/images/..`, `/fonts/...`).

## 8. Runtime & Debugging Notes

- The site is GPU-accelerated via Three.js islands (`src/islands/v*`). Keep animation loops isolated and use the managers directory to encapsulate tick/dispose logic.
- Use `console.warn`/`console.error` sparingly; prefer early returns and throwing only for developer-errors that should stop the page from mounting.
- When you need to inspect a component’s props or state, insert `console.debug` temporarily and remove it before committing.
- For layout bugs, open Chrome DevTools and inspect the computed styles from the layout component rather than overriding them globally.
- If the dev server fails, run `npm run astro -- check src/pages/index.astro` first—TypeScript/JSX errors usually manifest there.

## 9. Deployment & Hosting Considerations

- Cloudflare Workers (`@astrojs/cloudflare`) and Netlify (`@astrojs/netlify`) adapters coexist; keep both integrations up to date. When updating deployment scripts, confirm that both bundlers build successfully (`npm run build`).
- `wrangler` dependency is included for Cloudflare; run `npx wrangler whoami` after login to verify credentials are active. Do not commit secrets.
- The site ships as static HTML/CSS with client-side Three.js; keep bundler output deterministic by pinning dependency versions in `package-lock.json`.

## 10. Additional Guidance

- Prefer `export const ComponentName` for islands and helpers to keep tree-shaking friendly.
- When adding new fonts inside `public/fonts`, include the `@font-face` declaration near the shared layout (see `src/layouts/Layout.astro`).
- Document any extra assets or build steps you add to this AGENTS file so future agents know how to build the site.
- Provide semantic alt text for logos/images; this repo already uses descriptive text inside `index.astro` (e.g., `alt="FLOWのロゴ"`). Continue that practice.
- Mention in your final summary if you updated any of these conventions so the next agent can track the change.
