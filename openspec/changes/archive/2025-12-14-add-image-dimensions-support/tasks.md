## Implementation Tasks for add-image-dimensions-support

1. Review current `image` spec and implementation
   - Verify where parse/serialize and render logic live under `packages/basic-modules/src/modules/image`
2. Draft spec delta: `openspec/changes/add-image-dimensions-support/specs/image-dimensions/spec.md`
3. Draft design.md capturing decisions, units, defaults, and UI behaviors
4. Add unit tests for parse/serialize round-trip (width/height preserved)
5. Add renderer tests and snapshots for image with width/height
6. Add integration/E2E test in Cypress to verify persistence through editor save/load
7. Run `openspec validate add-image-dimensions-support --strict` and address issues
8. Iterate on spec/design after feedback and request approval

Validation: each task should include at least one assertion or test that verifies behaviour.
