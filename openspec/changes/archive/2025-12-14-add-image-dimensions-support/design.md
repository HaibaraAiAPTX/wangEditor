# Design: add-image-dimensions-support

## Context

This design documents how the image module will represent, parse, render, and allow editing of `width` and `height` attributes for image elements.

## Goals

- Preserve explicit author-specified dimensions when editing and round-tripping HTML.
- Support common units (`px`, `%`) and plain numbers interpreted as pixels for ease of use.
- Provide UI affordances for setting width/height and an option to lock aspect ratio.

## Non-Goals

- Implementing an advanced image cropper or responsive-source (`srcset`) generation — out of scope.

## Representation

- Model: image node gains optional `width?: string | null` and `height?: string | null` attributes.
- Allowed values: CSS-like strings (e.g., `100px`, `50%`) or numeric strings (`100`) which are interpreted as `100px`.

## Parsing / Serialization

- HTML parse: read `width` and `height` attributes on `<img>` elements and store as-is in model (normalize numeric to `px`).
- HTML serialize: if `width`/`height` present on model, emit them as `width` and `height` attributes or inline `style` when necessary (implementation detail; prefer attributes if round-trip safe).

## UI / Commands

- Menu: add a dialog or inline inputs to set `width` and `height` (accept px or %). Include a `lock aspect ratio` toggle.
- Presets: existing width presets (Width30/50/100) remain and set the `width` attribute accordingly.

## Backwards compatibility

- If HTML does not include `width`/`height`, behavior remains unchanged.
- Consumers that rely on preset-only flows will continue to work; new attributes are additive.

## Testing

- Unit tests: parse `<img width="100" height="50">` -> model -> serialize -> expect attributes preserved.
- Renderer snapshot tests: image nodes with various unit combinations.
- Cypress tests: insert image, set dimensions, save, reload, assert dimensions persisted.

## Tradeoffs & Alternatives

- Store numeric pixels internally vs CSS string: storing CSS strings is more general but requires normalization for numeric-only APIs. Chosen: store strings, normalize numbers to `px` on parse.
- Emit attributes vs inline styles: attributes are simpler for round-trip and HTML editing tools; styles allow more complex constraints. Prefer attributes for simplicity.

## Open Questions

- Should we support fractional values (e.g., `33.33%`)? Likely yes — allow any valid CSS length/percentage string.
- Should the serializer prefer `style="width:...;height:..."` when units are mixed? Default to attributes; revisit if issues arise.
