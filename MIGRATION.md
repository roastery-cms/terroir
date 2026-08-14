# Migration guide — `@roastery/terroir` 0.1.0 → 0.2.0

This release removes the JWT submodule, moves the layer discriminator symbol out of `exceptions/`, adds 17 exceptions to the domain and infra layers, gives every exception a `cause` slot plus an HTTP `code` on the application layer, and drops the `Schema` wrapper class from the schema module.

Four of those changes break consumers at build time. The rest are opportunities the release opens up — most of them delete code rather than add it.

Every file reference below was read directly, except where marked *(from survey)* — those come from an automated sweep of the consuming repositories and are worth confirming before editing.

---

## Part A — Required (build breaks without these)

### A1. The layer symbol moved and was renamed

`ExceptionLayer` (`Symbol("exception:layer")`, from `@roastery/terroir/exceptions/symbols`) is now `Layer` (`Symbol("layer")`, from `@roastery/terroir/symbols`). The `exceptions/symbols` subpath no longer exists.

```diff
- import { ExceptionLayer } from "@roastery/terroir/exceptions/symbols";
+ import { Layer } from "@roastery/terroir/symbols";

- error[ExceptionLayer]
+ error[Layer]
```

The symbol is compared by reference, so anything that reads it through the imported constant keeps working — only the import path and the identifier change.

| Repo | Sites |
|---|---|
| `barista` | `src/packages/error-handler/index.ts:3,89,97` (plus the doc mentions on `:19` and `constants/status-code-map.ts:10`) |
| `aroma` | `src/internal/serialize-error.ts:3,74`; `src/exceptions/aroma-exception.spec.ts:4,36`; doc mention in `src/exceptions/aroma-exception.ts:29` |

`@roastery/terroir/symbols` also exports `Context`, `Demo`, `Meta`, `Properties`, `Source` and `Storage` — the slot keys the domain bases in `beans` write to. `terroir` only declares them; hosting them in one package is what keeps the symbol identities equal across `beans` and its consumers.

**Which makes `beans/src/actions/` a duplicate declaration, and this one fails silently.** That directory declares its own `Symbol("context")`, `Symbol("demo")`, `Symbol("meta")`, `Symbol("properties")`, `Symbol("source")` and `Symbol("storage")`. Symbol equality is by reference, not by description: `Symbol("storage") !== Symbol("storage")`. So while `beans` keeps its own copies, an entity's slots are keyed by the `beans` symbols and anything reading them through `@roastery/terroir/symbols` gets `undefined` — no type error, no exception, just a missing value. The type-level matches (`{ [Properties]: infer Shape }`) stop resolving the same way.

Nothing is broken *today*, because nothing outside `beans` reads those slots yet. It breaks the moment something does, which is the whole reason the symbols were moved. So: delete `beans/src/actions/{context,demo,meta,properties,source,storage}.ts` and point the barrel at `@roastery/terroir/symbols` — `beans/src/entity/entity.ts:13` and `beans/src/value-object/value-object.ts:2` import `Demo` by direct path (`@/actions/demo`) and are the two sites that need a new import specifier rather than just a re-export.

### A2. JWT exceptions are gone

`InvalidJWTException` and `UnableToSignPayloadException` were removed along with the `@roastery/terroir/exceptions/application/jwt` subpath. JWT verification and signing are concerns of a specific auth implementation, not of the framework's error vocabulary.

Replacements, by failure mode:

| Was | Use |
|---|---|
| `InvalidJWTException` — token rejected at verification | `UnauthorizedException` (401) |
| `UnableToSignPayloadException` — signing failed | `InternalServerErrorException` (500) |

If `capsules/jwt` needs to keep the two names as part of *its own* public API, declare them locally extending `ApplicationException` — that is now the intended shape, and it lets the capsule distinguish failure modes the generic classes cannot (expired vs. forged vs. malformed vs. missing claim, all collapsed into one `catch (_)` today at `capsules/jwt/src/json-web-token.ts:95-97`).

| Repo | Sites |
|---|---|
| `capsules/jwt` | `src/json-web-token.ts:2-3,59,74,89,96`; docs in `README.md:11` and `docs/json-web-token.md:41,51` *(from survey)* |
| `capsules/auth` | `src/plugins/guards/auth.guard.spec.ts:5,95,105` |
| `barista` | `src/packages/error-handler/constants/status-code-map.ts:24,28`; `src/packages/error-handler/index.spec.ts:12-13,167,169,195,197` |

### A3. `RoasteryExceptionRecords` got much wider

The application layer went from 7 classes to 41. `RoasteryExceptionRecords<T>` is exhaustive by construction, so any object typed with it fails to compile until every key exists.

This affects `barista/src/packages/error-handler/constants/status-code-map.ts` and, transitively, `pantry/src/presentation/utils/barista-response.ts:72` *(from survey)*, which indexes it.

**Do not fill in the 34 missing keys.** Delete the map instead — see B1.

### A4. `Schema` is gone — schemas are plain TypeBox values again

The `Schema<T>` wrapper class was removed. `SchemaManager` stays and becomes static-only, and every method now takes and returns a `TSchema`, so a schema needs no unwrapping before TypeBox's own API (`Value.Check`, `Value.Convert`, `Static<typeof schema>`) accepts it.

```diff
- import { Schema } from "@roastery/terroir/schema";
+ import { SchemaManager } from "@roastery/terroir/schema";

- const schema = Schema.make(UserDTO);   // or new Schema(UserDTO)
- schema.match(value);
+ SchemaManager.match(UserDTO, value);   // the DTO *is* the schema
```

| Was | Now |
|---|---|
| `Schema.make(dto)` / `new Schema(dto)` | nothing — the TypeBox schema is already the value |
| `schema.match(value)` | `SchemaManager.match(dto, value)` (or `Value.Check(dto, value)`) |
| `schema.toString()` | `SchemaManager.serialize(dto)` |
| `schema.toJSON()` | the schema itself |
| `Schema<T>` as a type | `T` (or `TSchema`) |
| `SchemaManager.build<T>(json): Schema<T>` | `SchemaManager.build<T>(json): T` |
| `schema.map(value)` | `Value.Clean(dto, Value.Cast(dto, Value.Convert(dto, value)))` — see below |

`match` compiles each schema once and memoizes the validator in a `WeakMap` keyed by the schema object, so the per-instance compilation that `Schema.make` used to buy is now automatic. `build` compiles eagerly too, so a malformed payload still throws at build time rather than at first validation.

**`map` was removed with no replacement.** The `Convert → Cast → Clean` pipeline was three TypeBox calls behind one name; consumers that want it should call them directly. Only two sites use it — `capsules/models_models-type/src/domain/schemas/schema.schema.spec.ts:34` and `.../unpacked-models-type.schema.spec.ts:66`, both in specs.

| Repo | Files importing `@roastery/terroir/schema` |
|---|---|
| `capsules` | 80 |
| `beans` | 26 |
| `pantry` | 3 (`src/test-helpers/test-entity.ts:12,61`; `src/presentation/dtos/pagination.dto.spec.ts`; `.../id-or-slug.dto.spec.ts`) |
| `barista` | 2 (`src/packages/env/index.ts:3,88`; `src/packages/serve/index.spec.ts:7,17`) |

Most of those are mechanical: an import line plus a `Schema.make(XDTO)` that collapses into `XDTO`. Two are not:

- `beans/src/entity/entity.ts:72,178` — `ModelEntry` carries both `model: t.TObject` and `validator: Schema<t.TObject>`; the second field disappears (`SchemaManager.match(entry.model, value)`), and the blueprint `WeakMap` keeps memoizing the derived `model`, not the compiled validator.
- `capsules/models_models-type/src/domain/value-objects/schema.value-object.ts:1,10,13,16,34,36,43` — the VO stores a schema *as its value*, so `Schema<typeof SchemaDTO>` becomes `typeof SchemaDTO`, `tryBuildSchema` returns what `SchemaManager.build` returns, and `SchemaManager.isSchema(this.value.toJSON())` at `:43` becomes `SchemaManager.isSchema(this.value)`.

See B4 for what this deletes in `beans`.

---

## Part B — Simplifications this release enables

### B1. Delete `status-code-map.ts` and read `error.code`

Every application-layer exception now carries the HTTP status it maps to. The hand-maintained class-name→status table exists only to recover information the exception already has, and it was the thing breaking on every new class.

In `barista/src/packages/error-handler/index.ts:89-95`:

```diff
- const layerMap = STATUS_CODE_MAP[error[ExceptionLayer]] as Record<string, number>;
- const status = layerMap ? layerMap[error.constructor.name] : 500;
- set.status = status ?? 500;
+ set.status = error instanceof ApplicationException ? error.code : 500;
```

This also removes the dependency on `error.constructor.name`, which only survives today because the build does not mangle class names.

`code` is exclusive to the application layer. Domain, infra and internal exceptions deliberately have none — they are transport-agnostic, so a default of `500` (or a per-layer default, if you want domain violations to answer `422`) is the right call at the edge, and it belongs in the middleware, not in the exception.

### B2. `aroma` can drop its own `cause` plumbing

`AromaException` (`aroma/src/exceptions/aroma-exception.ts:18,55-57`) reimplemented the `cause` slot because the base class had no room for it. `InfraException` now forwards `ErrorOptions` to `Error`, so the local implementation can go and `AromaException` becomes a plain subclass again.

### B3. Elysia's own error codes deserve a mapping

Unrelated to this release but adjacent to the code you will be touching: `barista/src/packages/error-handler/index.ts:65` maps only `"NOT_FOUND"`, so Elysia's `"VALIDATION"` and `"PARSE"` both answer **500**. A body that fails schema validation should be `422` (`UnprocessableContentException`) and a malformed body `400` (`BadRequestException`).

### B4. `beans` can delete its whole `collections/schemas/` layer

Each of the 12 `*.schema.ts` files there is one line — `export const XSchema = Schema.make(XDTO)` — plus a spec that re-tests what the DTO's own spec already covers. Without the wrapper, `XSchema` and `XDTO` are the same value under two names: the DTO *is* the runtime schema.

The subpath `@roastery/beans/collections/schemas` and the 24 files behind it can go, with consumers importing the DTO instead. `beans/CLAUDE.md:42` describes `collections/` as shipping DTO / Schema / Value Object *triplets* — that becomes a pair, and the docstrings that say "runtime `Schema` instance wrapping X" lose their subject.

This is the largest single deletion the release enables, and also the one touching the most call sites — leaving the barrel in place re-exporting the DTOs under the old names is a fine first step.

---

## Part C — Wrong exception in use today

None of these break. Each is a site where the thrown class does not describe what happened, which is what makes the failure hard to read in logs. All references *(from survey)*.

### `adapters` — the highest-leverage file in the ecosystem

`adapters/{models,post}/src/prisma-error-manager.ts` maps 3 Prisma codes and sends everything else to `throw new UnknownException()` **with no argument**, discarding the original message. New codes worth mapping:

| Prisma | Meaning | Class |
|---|---|---|
| `P1001`, `P1017` | database unreachable / connection closed | `DatabaseUnavailableException` |
| `P1002`, `P1008` | connection or operation timed out | `OperationTimeoutException` |
| `P2028` | transaction API error | `TransactionFailedException` |
| `P2034` | write conflict / deadlock — **retryable** | `WriteConflictException` |
| `P3005`, `P3009`, `P3018` | migration drift / failed migration | `MigrationFailedException` |

And the fallback should carry the cause: `throw new UnknownException(undefined, { cause: err })`.

`adapters/{models,post}/src/connect-prisma.ts:18` uses `catch {` **without a binding**, so DNS failure, wrong password, timeout and un-migrated schema are indistinguishable:

```diff
- } catch {
-   throw new DatabaseUnavailableException("models-adapter@boot");
+ } catch (error) {
+   throw new DatabaseUnavailableException("models-adapter@boot", undefined, { cause: error });
```

`adapters/cache/src/decorators/safe-cache.decorator.ts:38-60`:
- `ERR_REDIS_AUTHENTICATION_FAILED` → `CredentialsRejectedException` (it is not unavailability — sending operators to chase a network problem that does not exist)
- `ERR_REDIS_INVALID_RESPONSE` → `UnexpectedCacheValueException` (already exists, unused here)
- the `connectionTimeout: 1000` configured at `plugins/cache.ts:77` → `OperationTimeoutException`
- the catch-all at `:60` should pass `{ cause: error }` instead of flattening the driver code into the message slot

`adapters/cache/src/plugins/cache.ts:55-57` reuses an existing plugin instance in silence → `DuplicatePluginException`.

### `roastery`

`src/bootstrap.ts:271-275` — five guards, all `UnknownException()` with no argument, mutually indistinguishable:

```diff
- if (!modelsRepository!) throw new UnknownException();
+ if (!modelsRepository!) throw new DependencyNotWiredException("models-repository");
```

`src/bootstrap.ts:141` — when `DATABASE_URL` is missing the app silently boots with in-memory repositories and loses data. That is `InvalidEnvironmentException` territory.

Also pinned at `@roastery/terroir: ^0.0.9` while `aroma`/`blend` are on `^0.1.0`, and depending on `@roastery-adapters/cache@^0.0.5` whose 0.1.1 has an incompatible signature.

### `capsules`

- **6 repository factories** (`post_post/src/infra/factories/repositories/post.repository.factory.ts:23-24` and siblings) throw `ResourceNotFoundException` when `prismaClient` was not injected → `DependencyNotWiredException`
- **bootstraps** use `UnknownException()` for repositories that were never constructed → `DependencyNotWiredException`
- `auth/src/utils/access-key.ts:60-63` throws `DatabaseUnavailableException` for **Redis** → `CacheUnavailableException`
- `auth/src/plugins/controllers/get-access.controller.ts:111-114` sets status 429 by hand → `TooManyRequestsException`
- `auth/src/plugins/guards/auth.guard.ts:115-118` throws `ResourceNotFoundException` for a missing JWT claim → `UnauthorizedException` (it is a 401, not a 404)
- `aws-s3/src/_index.ts:39-41` logs the upload failure with `console.error` and returns normally → `StorageUnavailableException`
- `post_post/src/infra/repositories/test/post.repository.ts:51,59` throw raw `Error` where the sibling in-memory repositories throw `ResourceNotFoundException` — three different behaviours for the same invariant across the capsules

### `beans`

The five new domain classes exist because of this repo. Each replaces a site that currently collapses into a generic class:

| Site | Today | Use |
|---|---|---|
| `src/entity/entity.ts:569` (write to `id`/`createdAt`/`updatedAt`) | `InvalidPropertyException` — same class as "unknown key" | `ImmutablePropertyException` |
| `src/entity/entity.ts:131-136` (`cycleError` factory) | `OperationFailedException` + long message | `CyclicEntityDefinitionException` |
| `src/entity/helpers/read-definition.ts:32`, `src/value-object/helpers/read-meta.ts:36` | `OperationFailedException` | `InvalidEntityDefinitionException` |
| `src/entity/helpers/install-accessors.ts:62` | `OperationFailedException` | `PropertyNameCollisionException` |
| `src/entity/helpers/extract-identity.ts:29,32` | `InvalidPropertyException` | `IncompleteIdentityException` |

Once migrated, `src/entity/entity.spec.ts:714,796,817` can assert on the exception type instead of `expect(error.message).toContain("schema")`.

### `pantry`

`src/application/use-cases/create-slugged-entity.use-case.ts:52-57` checks slug uniqueness and then creates, with a race window in between. The real violation arrives from the database as a unique-constraint error and nothing translates it back — worth catching `ConflictException` and rethrowing as `ResourceAlreadyExistsException`.

### `blend`

Nothing required. But `Blend.dependencies` is declared and never read by any code in the ecosystem — the orchestration layer its docstring describes does not exist yet. When it is written, `MissingPluginDependencyException` (0 uses today), `DuplicatePluginException` and `IncompatiblePluginVersionException` are the vocabulary for it.

---

## Suggested order

1. Publish `terroir` **0.2.0** (`package.json` is already bumped).
2. `aroma` and `barista` — A1 and A4, then B1 and B2. These two unblock everything downstream.
3. `capsules/jwt` and `capsules/auth` — A2.
4. `pantry` — A4 (3 files), and confirm A3 is resolved once `status-code-map.ts` is gone.
5. `beans` — A4 across 26 files, then B4. `beans` gates the `capsules`, which carry 80 of the 111 affected files, so it comes before them.
6. `adapters` — Part C. Highest diagnostic payoff per line changed.
7. `capsules` — A4 (mechanical for all but `models_models-type`'s `SchemaVO`), then Part C.
8. `roastery` and the rest — Part C at your own pace; nothing is broken while they wait.
