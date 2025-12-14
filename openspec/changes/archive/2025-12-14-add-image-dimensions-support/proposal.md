# Change: add-image-dimensions-support

## Why

Image elements currently support uploading, insertion, and a set of width presets via menu commands. Consumers need fine-grained width and height control per image element (including explicit px/% values and preserving aspect ratio) so content layouts match authors' intent and to support responsive rendering.

## What changes

- ADDED: image element model SHALL include `width` and `height` attributes (nullable). Values may be expressed in CSS units (px, %) or as a numeric pixel value.
- ADDED: editor UI and HTML parsing/rendering SHALL preserve and synchronize `width` and `height` when present.
- MODIFIED: existing image spec to document parsing of `width`/`height` attributes from HTML and export back to HTML.

**BREAKING?**: No breaking changes to public JS APIs are expected; HTML serialization may include new attributes which is additive.

## Impact

- Affected specs: `image` capability (adds dimension support)
- Affected packages: `packages/basic-modules/src/modules/image` (parser, render, menu items)
- Tests: unit tests for parse/serialize, render snapshot, integration in Cypress flows that verify persisted size

## Validation

- `openspec validate add-image-dimensions-support --strict` must pass.
- Tests: add unit tests to confirm round-trip parse->edit->serialize preserves width/height and UI menu can set values.

## Open Questions

- Preferred default units for programmatic APIs (px vs CSS string)? Proposal assumes string values like `100px` or `50%`, with helper normalizations where needed.
- Should the editor enforce aspect-ratio locking by default when both width and height are edited? Implementation detail to be decided in design.md.
