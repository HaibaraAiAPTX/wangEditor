1. Draft proposal.md describing goals and scope (done).
2. Add `specs/image-module/spec.md` with requirements and scenarios (done).
3. Add `design.md` capturing minimal rationale (done).
4. Add `packages/editor/examples/image-module.html` — a runnable example that demonstrates render/toHtml/parse (done).
5. Validate with `openspec validate add-image-module-tests --strict` and iterate on any validation errors (done).

Validation: at minimum manually open the example in a browser and verify the three features work as documented.

Notes:
- `openspec validate add-image-module-tests --strict` returned: `Change 'add-image-module-tests' is valid`.
