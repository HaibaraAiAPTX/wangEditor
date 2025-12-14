
## ADDED Requirements

### Requirement: Image example demonstrates render, to-HTML, and parse

The repository MUST include an example HTML page that allows a developer to:

- Render an `image` node from a Slate node structure and visually confirm the image appears in the editor.
- Convert the editor content to HTML (via `editor.getHtml()`), and display the generated HTML for inspection.
- Parse the generated or pasted HTML back into an editor instance and display the parsed Slate node tree as JSON.

#### Scenario: Render node

Given the example page is opened in a browser
When the developer clicks the "Render Node" button
Then the editor area shows an image rendered from a Slate `image` node

#### Scenario: Element -> HTML

Given an editor contains an `image` node
When the developer clicks "Get HTML"
Then the example shows the HTML string produced by the editor's `getHtml()` API

#### Scenario: HTML -> Node (parse)

Given an example HTML string that contains an image element or the HTML produced by the editor
When the developer clicks "Parse HTML to Nodes"
Then the example creates a new editor instance with the provided HTML and displays the parsed node tree as JSON
