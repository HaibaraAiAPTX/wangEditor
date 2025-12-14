# Change ID: add-image-module-tests

## Summary

Add an OpenSpec proposal to provide a manual test/example for the image module. The example will live in `packages/editor/examples` and demonstrate:

- rendering an `image` node (from Slate node structure),
- converting editor nodes to HTML (elem -> HTML),
- parsing HTML back into editor nodes (HTML -> node).

This is a small, focused change to aid reviewers and contributors when modifying image-related code.

## Why

Make it easier for contributors to manually verify image rendering and HTML parse/serialize behaviour without running unit tests. A simple example reduces friction when debugging regressions in `elemsToHtml` and `parseElemsHtml`.

## What Changes

- Adds an example HTML file at `packages/editor/examples/image-module.html`.
- Adds OpenSpec artifacts under `openspec/changes/add-image-module-tests/` including `proposal.md`, `design.md`, `tasks.md`, and `specs/image-module/spec.md`.

## Motivation

Provide a reproducible example that exercises the image module's `elemsToHtml` and `parseElemsHtml` behaviors and that can be used as a manual QA harness.

## Scope

- Add `packages/editor/examples/image-module.html` as a runnable browser example.
- Add OpenSpec scaffolding: `proposal.md`, `tasks.md`, `design.md`, and a spec delta under `specs/image-module/spec.md`.

## Risks

Low — only documentation and an example HTML file are added. No library code changes.
