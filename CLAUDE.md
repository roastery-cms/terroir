# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`@roastery/terroir` — a published TypeScript library that provides two primitives for the Roastery CMS ecosystem:

1. A symbol-tagged exception hierarchy organized by architectural layer.
2. A runtime schema validation/coercion engine built on TypeBox.

The package ships ESM + CJS with `.d.ts`, and each `src/**/index.ts` becomes its own subpath entry (`@roastery/terroir/exceptions`, `@roastery/terroir/exceptions/application`, `@roastery/terroir/schema`, etc.).

## Tooling and commands

The runtime, test runner and package manager are all Bun. Tools are pinned via `mise.toml` (`bun = "latest"`). Biome is invoked **directly** via its native CLI (`biome ...`) — never through `bunx`/`npm`/`pnpm` wrappers.

```bash
bun run test:unit          # bun test --env-file=.env.testing
bun run test:coverage      # bun test --env-file=.env.testing --coverage
bun run build              # biome check --fix && knip && tsup ... --dts --tsconfig tsconfig.build.json --clean
bun run knip               # detect unused exports/dependencies
bun run setup              # build + `bun link` (publish locally for downstream consumers)
```

Run a single test file with `bun test src/path/to/file.spec.ts`. `bunfig.toml` already restricts test discovery to `./src` and pins `serial = true` and `smol = true` — don't override these casually; they exist because tests rely on global TypeBox `FormatRegistry` state being deterministic.

The pre-commit hook chains `test:unit`, `test:coverage`, `knip`, and `setup` through `mise exec`. A failing `knip` blocks the commit, so dead exports/deps must be removed before committing.

Commit messages follow Conventional Commits (enforced by `commitlint` on `commit-msg`).

## Architecture

### Exception hierarchy

The exception system is the single most load-bearing pattern in this repo. Adding or modifying an exception requires touching multiple coordinated files; understand the full chain before editing any of them.

```
CoreException (abstract, extends Error)
├── [Layer]: "internal" | "domain" | "application" | "infra"
├── name, message, source       (all abstract readonly)
│
├── ApplicationException        (abstract, fixes [Layer] = "application")
│   └── concrete classes in src/exceptions/application/ (one per HTTP 4xx/5xx status)
│
├── DomainException             (abstract, fixes [Layer] = "domain")
│   └── concrete classes in src/exceptions/domain/
│
├── InfraException              (abstract, fixes [Layer] = "infra")
│   └── concrete classes in src/exceptions/infra/
│
└── [direct subclasses]         ([Layer] = "internal", source = "$internal")
    └── InvalidEntityDataException, InvalidObjectValueException, UnknownException
        in src/exceptions/*.ts (top-level)
```

`Layer` is a `Symbol("layer")` (in `src/symbols/layer.ts`, exported from the `@roastery/terroir/symbols` barrel alongside `Context`, `Demo`, `Meta`, `Properties`, `Source` and `Storage`). It is the runtime discriminator that survives bundler renaming and serialization — error-handling middleware reads this property, not `instanceof`. Exceptions import it as `import { Layer } from "@/symbols"`; there is no exception-scoped symbols module.

**`src/symbols/` is a declaration site, not a feature.** `Layer` is the only one this package uses; the other six key the internal slots of the `Entity` / `ValueObject` bases in `@roastery/beans`. They live here because symbol equality is by reference — one declaration is what lets `beans` write a slot and a consumer read it. Two rules follow: every symbol must be exported from `src/symbols/index.ts` (only barrels are published, so an unexported symbol is unreachable and `knip` will fail the build), and none of them may be re-declared downstream. Their TSDoc describes behaviour implemented in `beans`, so reference those types by package path — `@/value-object/types` does not exist in this repo.

**Naming convention** (intentional, not a bug): application/domain exception `name` fields use a bare label (e.g. `"Bad Request"`, `"Invalid Property"`). Infra exception `name` fields use the `*Exception` suffix (e.g. `"Conflict Exception"`, `"Cache Unavailable Exception"`). This is preserved for log compatibility — don't normalize it.

**HTTP coverage in the application layer**: `src/exceptions/application/` holds one class per HTTP error status registered by the IANA (4xx and 5xx). Four statuses are served by pre-existing domain-flavoured names, which stay canonical for those codes — `BadRequestException` (400), `UnauthorizedException` (401), `ResourceNotFoundException` (404), `ResourceAlreadyExistsException` (409). Don't add `NotFoundException`/`ConflictException` duplicates. `InvalidOperationException` is the only class not named after a status; it reports `400`.

**`code` is application-only** (`src/exceptions/models/application-exception.ts`): `ApplicationException` declares `public abstract readonly code: number` and every concrete class sets its status literal. `DomainException`, `InfraException` and the internal exceptions deliberately have none — a broken invariant or an unreachable database are transport-agnostic, and teaching them about HTTP would leak the delivery mechanism into layers that must not know it exists. The application layer is the exception because its catalogue *is* the HTTP registry: the coupling is already in the class name. Adding a class to `src/exceptions/application/` without a `code` is a compile error.

**`cause` on every concrete exception**: each constructor takes a trailing, optional `options?: ErrorOptions` forwarded as `super(message, options)`. Preserve this parameter when adding classes — translating a driver error into a layer exception must not discard the original. `tsconfig.json` targets `ESNext`, so `Error.cause` is native.

**Internal vs layer exceptions**: internal exceptions (`InvalidEntityDataException`, `InvalidObjectValueException`, `UnknownException`) extend `CoreException` *directly* — they bypass the abstract layer bases because they originate inside the framework, not from a business layer. Their `source` is always `"$internal"`.

### Type-level catalogue (auto-derived)

`src/exceptions/types/{application,domain,infra}-exceptions.ts` derive their unions with `keyof typeof Exceptions` from the corresponding barrels. `RoasteryExceptionKeysByLayer` and `RoasteryExceptionRecords<T>` (in `src/exceptions/types/index.ts`) compose these into layered registries that the compiler enforces to be exhaustive.

**Implication**: when you add a new exception class, you must export it from the layer's barrel (`src/exceptions/<layer>/index.ts`). The type catalogue picks it up automatically — no second list to update — but consumers using `RoasteryExceptionRecords` will get a *type error* until they add the new key. That's intentional.

### Schema module

**Schemas stay plain TypeBox values.** There is no wrapper class — the module used to ship a `Schema<T>` container and it was removed on purpose. Anything that takes or returns a schema takes or returns a `TSchema`, so consumers keep TypeBox's own API (`Value.Check`, `Value.Convert`, `Static<typeof schema>`, …) without unwrapping first. Don't reintroduce a container type; add a static to `SchemaManager` instead.

`SchemaManager` (in `src/schema/schema-manager.ts`) is a static-only class — `private constructor`, every member `static` — covering what TypeBox doesn't do on its own: crossing a serialization boundary.

- `build<T>(jsonString): T` — `JSON.parse` → `hydrateSchema` → `TypeCompiler.Compile`, returning the hydrated `TSchema`. It compiles eagerly so a malformed payload throws at `build` rather than at the first validation, and the compiled validator lands in the cache.
- `serialize(schema): string` — `JSON.stringify`; drops the `[Kind]` symbol, so the output is only usable through `build`.
- `match(schema, value): boolean` — check via the cached compiled validator.
- `isSchema(value): boolean` — accepts a JSON string or a parsed object; never throws.

`hydrateSchema` (in `src/schema/utils/hydrate-schema.ts`) walks the tree and reattaches the `[Kind]` symbol that `JSON.stringify` dropped — without it, TypeBox's compiler does not recognize the payload as a schema.

**Compiled-validator cache**: `TypeCompiler.Compile` is expensive, so `match` memoizes it in a module-level `WeakMap<TSchema, TypeCheck<TSchema>>` keyed by the schema object itself. Two consequences worth keeping in mind: identity keying means structurally identical schemas compile twice, and a schema mutated after first use keeps its stale validator. Schemas reaching this module are treated as immutable.

**Format registry side-effect**: `src/schema/formats/index.ts` does seven side-effect imports that mutate the global TypeBox `FormatRegistry`. Importing `@roastery/terroir/schema` (or anything that transitively imports it, like `SchemaManager`) registers `"date-time" | "email" | "json" | "simple-url" | "slug" | "url" | "uuid"` exactly once. The `"uuid"` format is **v7-only** — other versions are rejected so downstream code can rely on the time-ordered prefix.

### Build pipeline

`tsup` is a peer dependency, not a devDependency. The build entry is `'src/**/index.ts'` (glob) — every barrel becomes its own bundled entry, which is what makes `@roastery/terroir/<subpath>` work. `package.json` `exports` and `typesVersions` are wired to match this `dist/<subpath>/index.{js,cjs,d.ts}` layout; if you add a new subpath, the build picks it up automatically because the glob does, but consumers won't see it until they upgrade.

`tsconfig.json` is the development config (`noEmit: true`, `allowImportingTsExtensions: true`, path alias `@/*` → `./src/*`). `tsconfig.build.json` is what `tsup` consumes (`noEmit: false`, `declaration: true`, drops `.spec.ts`/`.test.ts`).

## Conventions

- **Tests**: `bun:test` exclusively. Do not introduce Vitest, Jest, etc. Test files are colocated with their source as `*.spec.ts`. Don't use `any` in tests — keep the original types strict.
- **Path alias**: import from `@/...` rather than relative paths when crossing module boundaries. Both `tsconfig.json` and the build config understand it.
- **Verbatim module syntax**: `tsconfig.json` has `verbatimModuleSyntax: true`. Use `import type` for type-only imports.
- **Stale references**: the `.agent/` submodule (a git submodule pointing at `caffeine-js/agent-guide`) still contains rules referencing `@caffeine/entity/factories` and `@caffeine/entity/helpers` — those are vestigial from before the rename to Roastery. Don't write code that imports from those paths.
