# editor Specification

## Purpose
TBD - created by archiving change bind-editor-multi-toolbar-20251208. Update Purpose after archive.
## Requirements
### Requirement: Editor supports binding multiple toolbar instances
The editor SHALL provide a way to bind multiple toolbar instances so that more than one toolbar can coexist and interact with the same editor instance.

#### Scenario: Two toolbars bound to a single editor
- **GIVEN** an editor instance is embedded in a page
- **AND** two toolbar instances (`toolbarA`, `toolbarB`) are bound to the editor
- **WHEN** the user clicks `Bold` on `toolbarA`
- **THEN** the selected text in the editor becomes bold
- **AND** both `toolbarA` and `toolbarB` reflect the updated active state for `Bold` (e.g., toggle appears active)

#### Scenario: Toolbar invoked command updates other toolbars
- **GIVEN** `toolbarA` and `toolbarB` are both bound
- **WHEN** `toolbarB` executes an insert-image command that updates the editor document
- **THEN** `toolbarA` receives the subsequent editor state update and updates any stateful UI accordingly (e.g., disabling commands that are not applicable)

#### Scenario: Unbinding a toolbar removes its subscriptions
- **GIVEN** a toolbar `toolbarC` is bound and then removed/unbound
- **WHEN** `toolbarC` is unbound/disposed
- **THEN** `toolbarC` no longer receives editor state updates and invoking its UI will not trigger editor commands

### Requirement: Backwards compatibility for single-toolbar usage
Existing single-toolbar integrations SHALL continue to function without modification; the single-toolbar binding API MUST be a compatibility surface that maps to the new multi-binding mechanism.

#### Scenario: Single toolbar integration works unchanged
- **GIVEN** an integration that only binds one toolbar using the legacy single-bind API
- **WHEN** the integration runs after the change
- **THEN** the editor behaves identically and the toolbar receives state and command hooks as before

