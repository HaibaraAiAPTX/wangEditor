# image-dimensions Specification

## Purpose
TBD - created by archiving change add-image-dimensions-support. Update Purpose after archive.
## Requirements
### Requirement: Image element supports width and height attributes
The image capability SHALL allow individual image elements to carry optional `width` and `height` attributes which indicate the rendered size of the image.

#### Scenario: Parse width and height from HTML
- **GIVEN** an HTML fragment containing `<img src="/media/x.png" width="100" height="50">`
- **WHEN** the editor parses the HTML into its document model
- **THEN** the resulting image node MUST include `width` equal to `100px` and `height` equal to `50px` (numeric values normalized to px)

#### Scenario: Parse percentage unit from HTML
- **GIVEN** `<img src="/media/x.png" width="50%">`
- **WHEN** parsed into the document model
- **THEN** the image node MUST include `width` equal to `50%` and `height` absent/null

#### Scenario: Serialize width and height back to HTML
- **GIVEN** an image node with `width`=`100px` and `height`=`50px`
- **WHEN** the editor serializes the document to HTML
- **THEN** the output MUST contain an `<img>` element with `width="100"` and `height="50"` (or an equivalent `style` preserving these values) so the values survive round-trip

#### Scenario: UI sets width and height with aspect ratio lock
- **GIVEN** a user selects an image and inputs `width=200px` with aspect-ratio lock enabled
- **WHEN** the user then edits the `height` input to `100px`
- **THEN** the editor MUST either prevent the change (if locked) or update the other dimension to preserve the original aspect ratio per the UI affordance (implementation choice documented in design.md)

### Requirement: Existing width presets remain functional
The existing preset menu commands (e.g., Width30, Width50, Width100) SHALL continue to function and set the `width` attribute on the image node.

#### Scenario: Apply preset
- **GIVEN** an image node without `width`
- **WHEN** the user applies the `Width50` menu item
- **THEN** the image node MUST have its `width` set to the value defined by that preset (e.g., `50%` or `50px` depending on current preset semantics)

