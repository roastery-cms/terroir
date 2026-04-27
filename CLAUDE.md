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
├── [ExceptionLayer]: "internal" | "domain" | "application" | "infra"
├── name, message, source       (all abstract readonly)
│
├── ApplicationException        (abstract, fixes [ExceptionLayer] = "application")
│   └── concrete classes in src/exceptions/application/{,jwt/}
│
├── DomainException             (abstract, fixes [ExceptionLayer] = "domain")
│   └── concrete classes in src/exceptions/domain/
│
├── InfraException              (abstract, fixes [ExceptionLayer] = "infra")
│   └── concrete classes in src/exceptions/infra/
│
└── [direct subclasses]         ([ExceptionLayer] = "internal", source = "$internal")
    └── InvalidEntityDataException, InvalidObjectValueException, UnknownException
        in src/exceptions/*.ts (top-level)
```

`ExceptionLayer` is a `Symbol("exception:layer")` (in `src/exceptions/symbols/exception-layer.ts`). It is the runtime discriminator that survives bundler renaming and serialization — error-handling middleware reads this property, not `instanceof`.

**Naming convention** (intentional, not a bug): application/domain exception `name` fields use a bare label (e.g. `"Bad Request"`, `"Invalid Property"`). Infra exception `name` fields use the `*Exception` suffix (e.g. `"Conflict Exception"`, `"Cache Unavailable Exception"`). This is preserved for log compatibility — don't normalize it.

**Internal vs layer exceptions**: internal exceptions (`InvalidEntityDataException`, `InvalidObjectValueException`, `UnknownException`) extend `CoreException` *directly* — they bypass the abstract layer bases because they originate inside the framework, not from a business layer. Their `source` is always `"$internal"`.

### Type-level catalogue (auto-derived)

`src/exceptions/types/{application,domain,infra}-exceptions.ts` derive their unions with `keyof typeof Exceptions` from the corresponding barrels. `RoasteryExceptionKeysByLayer` and `RoasteryExceptionRecords<T>` (in `src/exceptions/types/index.ts`) compose these into layered registries that the compiler enforces to be exhaustive.

**Implication**: when you add a new exception class, you must export it from the layer's barrel (`src/exceptions/<layer>/index.ts`). The type catalogue picks it up automatically — no second list to update — but consumers using `RoasteryExceptionRecords` will get a *type error* until they add the new key. That's intentional.

### Schema module

`Schema<T extends TSchema>` (in `src/schema/schema.ts`) wraps a TypeBox schema and eagerly compiles it via `TypeCompiler.Compile`. It exposes:

- `match(value)` — fast boolean check via the compiled validator.
- `map(value)` — `Convert → Cast → Clean` pipeline (coerces primitives, fills defaults, strips unknown properties).
- `toString()` / `toJSON()` — JSON serialization (drops the TypeBox `[Kind]` symbol).

`SchemaManager.build<T>(jsonString)` rebuilds a typed `Schema` from a serialized payload by passing the parsed JSON through `hydrateSchema` (in `src/schema/utils/hydrate-schema.ts`) before compilation. `hydrateSchema` walks the tree and reattaches the `[Kind]` symbol that `JSON.stringify` dropped — without it, TypeBox's compiler does not recognize the payload as a schema.

**Format registry side-effect**: `src/schema/formats/index.ts` does seven side-effect imports that mutate the global TypeBox `FormatRegistry`. Importing `@roastery/terroir/schema` (or anything that transitively imports it, like `Schema`/`SchemaManager`) registers `"date-time" | "email" | "json" | "simple-url" | "slug" | "url" | "uuid"` exactly once. The `"uuid"` format is **v7-only** — other versions are rejected so downstream code can rely on the time-ordered prefix.

### Build pipeline

`tsup` is a peer dependency, not a devDependency. The build entry is `'src/**/index.ts'` (glob) — every barrel becomes its own bundled entry, which is what makes `@roastery/terroir/<subpath>` work. `package.json` `exports` and `typesVersions` are wired to match this `dist/<subpath>/index.{js,cjs,d.ts}` layout; if you add a new subpath, the build picks it up automatically because the glob does, but consumers won't see it until they upgrade.

`tsconfig.json` is the development config (`noEmit: true`, `allowImportingTsExtensions: true`, path alias `@/*` → `./src/*`). `tsconfig.build.json` is what `tsup` consumes (`noEmit: false`, `declaration: true`, drops `.spec.ts`/`.test.ts`).

## Conventions

- **Tests**: `bun:test` exclusively. Do not introduce Vitest, Jest, etc. Test files are colocated with their source as `*.spec.ts`. Don't use `any` in tests — keep the original types strict.
- **Path alias**: import from `@/...` rather than relative paths when crossing module boundaries. Both `tsconfig.json` and the build config understand it.
- **Verbatim module syntax**: `tsconfig.json` has `verbatimModuleSyntax: true`. Use `import type` for type-only imports.
- **Stale references**: the `.agent/` submodule (a git submodule pointing at `caffeine-js/agent-guide`) still contains rules referencing `@caffeine/entity/factories` and `@caffeine/entity/helpers` — those are vestigial from before the rename to Roastery. Don't write code that imports from those paths.
