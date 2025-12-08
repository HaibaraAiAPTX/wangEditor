# Change: Bind editor to multiple toolbars

## Change ID
`bind-editor-multi-toolbar-20251208`

## Summary
Allow an editor instance to bind to multiple toolbar instances simultaneously, so integrators can present multiple, independent toolbars (e.g., primary, floating, and contextual toolbars) that all interact with the same editor state.

## Why
- Some embedding scenarios need more than one toolbar (persistent top toolbar + contextual floating toolbar + module-specific toolbar). Today the editor assumes a single bound toolbar in many flows, which complicates integrations and duplication of commands.

## What Changes
- ADDED capability: editor supports binding multiple toolbar instances and routing commands/events between them and the editor core.
- Editor configuration gains a stable API to accept multiple toolbar registries/instances.
- Toolbars receive consistent editor state and command APIs regardless of which toolbar initiated the action.

## Impact
- Affected specs: `editor` (new ADDED delta under `openspec/changes/.../specs/editor/spec.md`).
- Affected code: high-level editor binding and toolbar glue code (editor package and toolbar modules). Specific files will be identified during implementation.
- Backwards compatibility: existing single-toolbar usage should continue to work; the implementation MUST provide a compatibility path for existing consumers.

## Non-Goals
- Redesigning toolbar UI components or their rendering — this change is API/behavior-focused and does not impose UI changes.
- Bundling or switching toolbar implementations shipped in `packages/` beyond small adapter shims.

## Acceptance Criteria
- The editor API allows registering N toolbar instances; N>1 is allowed and exercised by scenarios in the spec delta.
- When multiple toolbars are bound, commands invoked from any toolbar affect the same editor state and reflect on other toolbars as applicable (e.g., active formatting toggles update across toolbars).
- Existing single-toolbar integrations continue to work without code changes.

## Tasks and Next Steps
- See `tasks.md` in this change for a concrete implementation checklist.

## Stakeholders
- Editor maintainers
- Toolbar module owners
- Integrators who embed the editor in host apps

## References
- `openspec/project.md`
- `openspec/AGENTS.md`
