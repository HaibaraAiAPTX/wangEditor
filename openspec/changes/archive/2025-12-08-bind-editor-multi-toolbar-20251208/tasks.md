## Tasks for `bind-editor-multi-toolbar-20251208`

### 1) Discovery & spec
- [ ] 1.1 Verify existing `editor` and `toolbar` code paths that assume single-toolbar binding
- [ ] 1.2 Iterate and finalize `spec.md` deltas (this change) and ensure every requirement has at least one scenario

### 2) Implementation (apply stage)
- [ ] 2.1 Add a minimal API surface in `editor` to register multiple toolbar instances (design adapters, keep backward compatibility)
- [ ] 2.2 Implement command routing so toolbars invoke editor commands identically to the single-toolbar path
- [ ] 2.3 Implement toolbar state broadcasting so toggles/active states update across bound toolbars
- [ ] 2.4 Add adapter(s) for existing toolbar module(s) if needed

### 3) Tests & Validation
- [ ] 3.1 Unit tests: editor binding API, command routing, and state broadcast
- [ ] 3.2 Integration/Cypress: page embedding two toolbars hitting common commands and asserting synchronized state
- [ ] 3.3 Run `openspec validate bind-editor-multi-toolbar-20251208 --strict` and address any file-format issues

### 4) Docs & Migration
- [ ] 4.1 Update docs in `editor/README.md` showing new API examples (single → multi toolbar migration snippet)
- [ ] 4.2 Add a short migration note for integrators showing the backward-compatible usage

### 5) Release & Archive
- [ ] 5.1 Open PR implementing the change; link this change ID in the PR description
- [ ] 5.2 After merge and release, archive the change under `openspec/changes/archive/` with date stamp

Validation: Each implementation task should include unit tests and at least one integration scenario that exercises multiple bound toolbars.
