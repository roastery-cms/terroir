# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-08-15

### Added

- `Rules` to the `@roastery/terroir/symbols` subpath: the symbol keying the per-property rules of an `Entity` blueprint in `@roastery/beans` (a partial map of blueprint key to `{ default }` or `{ derive }`). It joins `Context`, `Demo`, `Layer`, `Meta`, `Properties`, `Source` and `Storage` as a slot declared here and written/read by `beans` — a symbol key keeps the rule map out of `Object.keys`/`Object.entries`, so it can live on the blueprint object itself without disturbing any existing traversal.
- Complete HTTP error catalogue in the application layer: 36 new exceptions, one per 4xx/5xx status registered by the IANA (402, 403, 405–408, 410–418, 421–426, 428, 429, 431, 451, 500–508, 510, 511). Each ships the usual `(source, message?)` signature, a templated default message, TSDoc with the status it maps to, and a colocated spec. Four statuses keep their pre-existing domain-flavoured names as the canonical class for that code — `BadRequestException` (400), `UnauthorizedException` (401), `ResourceNotFoundException` (404), `ResourceAlreadyExistsException` (409) — so no duplicate `NotFound`/`Conflict` classes were introduced. The classes carry no numeric `status` field; the status↔class mapping stays with the consumer through `RoasteryExceptionRecords<number>`.

- 17 exceptions covering failure modes the ecosystem hits but had no class for. **Infra (12)**: `DependencyNotWiredException`, `MigrationFailedException`, `DuplicatePluginException`, `ExternalServiceUnavailableException`, `OperationTimeoutException`, `CredentialsRejectedException`, `TransactionFailedException`, `WriteConflictException`, `OptimisticLockException`, `StorageUnavailableException`, `FileNotFoundException`, `FileWriteFailedException`. **Domain (5)**: `ImmutablePropertyException`, `PropertyNameCollisionException`, `IncompleteIdentityException`, `InvalidEntityDefinitionException`, `CyclicEntityDefinitionException`. Each was chosen from evidence in the consuming repositories — sites that were reaching for the wrong class, swallowing the error, or discriminating on a message substring.
- `cause` support across the whole hierarchy: every concrete exception now takes a trailing, optional `ErrorOptions` forwarded to `Error`, so a driver error can be preserved when it is translated into a layer exception (`new DatabaseUnavailableException("postgres@boot", undefined, { cause: error })`).
- `code` on `ApplicationException`: every application-layer class exposes the HTTP status it maps to as a numeric literal. Error middleware can read `error.code` instead of maintaining a parallel class-name→status table that has to be updated by hand for every new class. Exclusive to this layer — `DomainException`, `InfraException` and the internal exceptions stay transport-agnostic.
- The `@roastery/terroir/symbols` subpath, hosting the well-known symbols of the ecosystem — `Context`, `Demo`, `Meta`, `Properties`, `Source` and `Storage` — alongside `Layer`. They key the internal slots of the `Entity` / `ValueObject` bases in `@roastery/beans`, which declared them locally until now. Symbol equality is by reference, so a single declaration site is what lets `beans` write `this[Storage]` and a consumer read that same slot; duplicate declarations of `Symbol("storage")` compare unequal and the read silently returns `undefined`. `terroir` declares them and, apart from `Layer`, does not use them.
- `SchemaManager.match(schema, value)` and `SchemaManager.serialize(schema)`, taking over the two `Schema` methods that had no TypeBox one-liner equivalent. `match` compiles each schema once and memoizes the validator in a module-level `WeakMap` keyed by the schema object, so callers get the compiled-validator behaviour `Schema` used to provide without holding an instance.

### Changed

- **Breaking**: `SchemaManager` is now a static-only class (`private constructor`), and every member takes and returns a plain `TSchema`. `SchemaManager.build<T>(json)` returns the hydrated TypeBox schema itself instead of a `Schema<T>` — it still compiles eagerly, so a malformed payload throws at `build` rather than at first validation, and the compiled validator is cached for the returned schema.

- **Breaking**: the layer discriminator symbol moved and was renamed. `ExceptionLayer` (`Symbol("exception:layer")`, from `@roastery/terroir/exceptions/symbols`) is now `Layer` (`Symbol("layer")`, from `@roastery/terroir/symbols`), sitting alongside the other well-known symbols of the ecosystem (`Context`, `Demo`, `Meta`, `Properties`, `Source`, `Storage`). Every exception now declares its layer under `[Layer]`; middleware reading the discriminator must import the new symbol.

### Removed

- **Breaking**: the `@roastery/terroir/exceptions/symbols` subpath, whose only export was the symbol above. Import `Layer` from `@roastery/terroir/symbols` instead.
- **Breaking**: the JWT submodule. `InvalidJWTException` and `UnableToSignPayloadException` are gone, along with the `@roastery/terroir/exceptions/application/jwt` subpath. JWT verification/signing is a concern of a specific auth implementation, not of the framework's error vocabulary — consumers should declare their own exception (or use `UnauthorizedException` for verification failures and `InternalServerErrorException` for signing failures).
- **Breaking**: the `Schema<T>` class. Schemas are plain TypeBox values again — a DTO built with `t` *is* the runtime schema, so there is nothing to wrap and nothing to unwrap before `Value.Check`, `Value.Convert` or `Static<typeof schema>` accept it. `Schema.make(dto)` / `new Schema(dto)` disappear at the call site; `schema.match(v)` becomes `SchemaManager.match(dto, v)`, `schema.toString()` becomes `SchemaManager.serialize(dto)`, `schema.toJSON()` becomes the schema itself, and `Schema<T>` as a type annotation becomes `T`.
- **Breaking**: `Schema.map` — the `Convert → Cast → Clean` pipeline. It was three TypeBox calls behind one name and did not survive the wrapper. Consumers that want the coercion should call `Value.Clean(schema, Value.Cast(schema, Value.Convert(schema, value)))` directly, and pick only the steps they actually need.

### Fixed

- Corrected the `BadRequestException` example in `README.md`, whose arguments were swapped relative to the real `(source, message?)` signature.

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
[0.2.0]: https://github.com/roastery-cms/terroir/releases/tag/v0.2.0
