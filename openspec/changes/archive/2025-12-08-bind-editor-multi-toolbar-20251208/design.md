# Design Notes — Bind editor to multiple toolbars

## Context
The editor currently provides toolbar binding helpers used by integrations and module code. Some flows assume a single toolbar instance which limits integrator UX (multiple toolbars on a page). This design captures a minimal, low-risk approach to support multiple toolbars.

## Goals
- Minimal API surface change; keep current single-toolbar code paths working unchanged.
- Clear lifecycle for multiple toolbar instances (register, unregister, dispose).
- Deterministic command routing and consistent toolbar state broadcast.

## Options Considered

- Option A — Editor accepts an array of toolbar instances (shallow adapters)
  - Pros: Simple, minimal surface area, easy to implement.
  - Cons: Slightly less explicit about toolbar roles (primary/auxiliary).

- Option B — Toolbar registry with named slots (e.g., `primary`, `floating`, `contextual`)
  - Pros: Explicit roles, easier to expose UI-specific ordering and precedence.
  - Cons: Added complexity and surface area; requires naming conventions and more docs.

Recommendation: Start with Option A (array-based) in an additive, backward compatible way. If consumers need named roles later, add a minimal registry adapter or an optional config object.

## API Sketch (no code in proposal)
- Editor exposes a new `bindToolbars(toolbars: Toolbar[])` API that coexists with existing `bindToolbar(toolbar)` convenience.
- Toolbars implement a small adapter interface that allows them to: subscribe to editor state updates, and dispatch commands to the editor. Existing toolbar implementations are adapted to this interface.

## Backwards Compatibility
- `bindToolbar(toolbar)` remains supported and internally calls `bindToolbars([toolbar])` so existing integrations do not change.

## Risks & Mitigations
- Risk: Toolbars may introduce heavy listeners and cause performance issues. Mitigation: use a shallow observer pattern; batch state updates and debounce frequent changes.
- Risk: Confusion in integrator code about which toolbar should control focus. Mitigation: document conventions and provide helper utilities for focus routing.

## Testing Approach
- Unit tests for binding/unbinding, command routing, and state broadcasting.
- Integration Cypress scenario with at least two toolbars interacting with the same editor instance and asserting synchronized state.

## Open Questions
- Do we want named toolbar roles out-of-the-box, or should role names be added only if requested by integrators? (Prefer add-on later.)
