# Project Context

## Purpose
wangEditor is a modular rich-text editor intended to be embedded in web applications. It provides a lightweight, extensible editing core plus a set of feature modules (tables, lists, image upload, video, etc.) so consumers can pick only the capabilities they need.

## Tech Stack
- **Language:** TypeScript (monorepo packages are TS-first)
- **Package manager / monorepo:** pnpm, with `pnpm-workspace.yaml` and `lerna.json` for orchestration
- **Build tools:** Rollup (library bundles) and Vite (demo/dev for `editor` package)
- **Transpilation / config:** Babel and `tsconfig.json` variants for library and test builds
- **Testing:** Jest for unit tests, Cypress for integration/e2e tests
- **Linting / config:** ESLint config present (`eslint.config.mjs`), `commitlint.config.js` for commit message enforcement
- **CI / release:** Release tooling and scripts (e.g., `scripts/release-tag.js`, rollup/pack configs) — releases are automated with repository scripts

## Project Conventions

### Code Style
- Follow the repository ESLint configuration (`eslint.config.mjs`) and TypeScript rules in `tsconfig.json` and package-level tsconfigs.
- Use descriptive TypeScript types; prefer named interfaces over anonymous object types where useful.
- Keep public API surface minimal and stable; exported APIs should have clear type declarations and tests.

### Architecture Patterns
- Monorepo layout under `packages/` and top-level capability folders (e.g., `editor/`, `core/`, `basic-modules/`). Each package is a single responsibility capability with its own `package.json`.
- Editor core provides the baseline editing engine; modules live as separate packages that extend the core via plugin interfaces.
- Build artifacts are produced per-package (Rollup configs exist in package roots and top-level build scripts).
- Design for small bundles: consumers often include only a subset of modules, so keep dependencies optional and peer when appropriate.

### Testing Strategy
- Unit tests: Jest is used for package-level unit tests (look for `__tests__/` directories).
- Integration / e2e: Cypress tests exist under `cypress/` and test real editor flows; run them against the demo or a dev server.
- Tests should be deterministic; avoid flaky DOM timing by using Cypress best practices and stable selectors.

### Git Workflow
- Branching: use feature branches named `feature/<short-desc>` or `fix/<short-desc>`; open PRs against `master`.
- Commits: follow conventional commits and the repo's `commitlint` rules to populate changelog and release metadata.
- Reviews: all changes should be code-reviewed via PRs; maintainers will approve and run CI before merging.

## Domain Context
- Purpose: Rich text editing with modular features suitable for content editing in web apps (CMS, blogs, admin UIs).
- Key capabilities: toolbar, lists, tables, image upload, video embedding, plugins for custom nodes, and extensible schema and commands.
- Consumers expect a small, focused API for embedding the editor and configuring which modules are enabled.

## Important Constraints
- Bundle size and runtime performance are primary concerns — prefer light-weight implementations and lazy-loading modules where feasible.
- Browser compatibility: target evergreen browsers; avoid heavy polyfills unless required by a specific consumer.
- Backwards compatibility: public APIs in `editor/` and `core/` should be stable; breaking changes require an OpenSpec proposal.

## External Dependencies
- Build and tooling: Rollup, Vite, Babel, pnpm, Lerna (dev-time dependencies).
- Testing: Jest and Cypress (dev-time).
- No mandatory external runtime services are required by the core editor; modules may integrate with host application APIs (e.g., file upload endpoints) which must be configured by the integrator.

## How AI Assistants Should Work With This Repo
- Read `openspec/project.md` and `openspec/AGENTS.md` before proposing changes.
- Proposals are required for new capabilities and breaking changes (follow the OpenSpec workflow in `openspec/AGENTS.md`).
- Keep changes small and focused; prefer ADDED deltas for new capabilities and MODIFIED deltas when changing behavior of existing specs.

## Useful Commands
- Install: `pnpm install`
- Run a package build: `pnpm -w run build` (or see individual package scripts)
- Run tests: `pnpm -w test` and `pnpm -w run test:e2e` for Cypress flows
- Lint: `pnpm -w run lint`

If you want, I can expand any section with more specifics (e.g., concrete build commands per package, CI steps, or style rules).
