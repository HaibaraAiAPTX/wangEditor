# Design

This change only adds documentation and an example HTML page. The example uses the editor's public API (`createEditor`, `createToolbar`, `editor.getHtml()`) to:

- render a Slate `image` node by creating an editor instance with a `content` array containing an `image` node;
- obtain produced HTML via `editor.getHtml()` (to test elemToHtml path);
- parse the HTML back into Slate nodes by creating another editor with the `html` option and reading its `children` (to test parseElemsHtml path).

Rationale: Reusing the public `createEditor` + `html`/`content` surface avoids needing to call internal parse helpers and matches existing example patterns.
