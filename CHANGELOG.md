# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-04-27

### Added

- Comprehensive TSDoc across the public API: `CoreException`, the layer-base classes (`ApplicationException`, `DomainException`, `InfraException`), every concrete exception, `Schema`, `SchemaManager`, the format registrations under `src/schema/formats/`, and the root entry point. Each item now ships with `@example`, `@remarks`, `@see`, `@param`, `@returns`, and `@throws` annotations to surface in editor tooltips and generated docs.
- `knip` step integrated into the `build` script — dead exports/dependencies now block the build (mirroring the pre-commit hook).
- Biome `files.includes` configuration scoping checks to `./src/**/*.ts`.
- Three README notes covering load-bearing behaviors that previously lived only in `CLAUDE.md`:
  - Cross-layer naming convention for the `name` field (bare label for application/domain, `*Exception` suffix for infra).
  - Global, idempotent side-effect of importing `@roastery/terroir/schema` on TypeBox's `FormatRegistry`.
  - `uuid` format is **v7-only by design** — other UUID versions are rejected.

### Changed

- Public exception fields (`name`, `source`, `message`) on every concrete and abstract exception class are now `readonly`. Immutability is now part of the public type contract, not just a runtime convention.
- `uuid` and `@sinclair/typebox` moved from `peerDependencies` to `dependencies` — consumers no longer need to install them explicitly alongside `@roastery/terroir`.
- `package.json` `keywords` expanded from 6 to 20 entries. `framework` added in first position to reflect the package's role as the foundation of the Roastery ecosystem; descriptive keywords (`exceptions`, `exception-hierarchy`, `error-handling`, `schema-validation`, `runtime-validation`, `typebox`, `uuid-v7`, `clean-architecture`, `ddd`, …) added alongside the existing branding ones.
- Biome upgraded from `2.4.3` to `2.4.11`.

### Fixed

- Corrected internal-exception import example in `README.md`: `InvalidEntityData` → `InvalidEntityDataException` (the class name that actually ships from `@roastery/terroir/exceptions`).

[0.1.0]: https://github.com/roastery-cms/terroir/releases/tag/v0.1.0
