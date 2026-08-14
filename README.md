# @roastery/terroir

Layered exception hierarchy and runtime schema validation for the [Roastery CMS](https://github.com/roastery-cms) ecosystem.

[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

## Overview

**terroir** provides two core primitives for building robust, type-safe TypeScript applications:

- **Exception hierarchy** — A structured, symbol-tagged exception system organized by architectural layer (Domain, Application, Infrastructure), designed for Clean Architecture and DDD applications.
- **Schema validation** — Custom TypeBox string formats (UUID v7, slug, email, and more) plus `SchemaManager`, which serializes, rehydrates and validates [TypeBox](https://github.com/sinclairzx81/typebox) schemas that cross a serialization boundary.

## Technologies

| Tool | Purpose |
|------|---------|
| [TypeBox](https://github.com/sinclairzx81/typebox) | Runtime schema validation and TypeScript type inference |
| [uuid](https://github.com/uuidjs/uuid) | UUID v7 format validation |
| [tsup](https://tsup.egoist.dev) | Bundling to ESM + CJS with `.d.ts` generation |
| [Bun](https://bun.sh) | Runtime, test runner, and package manager |
| [Knip](https://knip.dev) | Unused exports and dependency detection |
| [Husky](https://typicode.github.io/husky) + [commitlint](https://commitlint.js.org) | Git hooks and conventional commit enforcement |

## Installation

```bash
bun add @roastery/terroir
```

**Peer dependencies** (install alongside):

```bash
bun add @sinclair/typebox uuid
```

---

## Exceptions

All exceptions extend `CoreException` and carry a Symbol-tagged `[Layer]` property for runtime layer detection.

```typescript
import { Layer } from '@roastery/terroir/symbols';

function handleError(err: unknown) {
  if (err instanceof Error && Layer in err) {
    const layer = (err as any)[Layer]; // 'application' | 'domain' | 'infra' | 'internal'
    console.log(`Error from layer: ${layer}`);
  }
}
```

> **Naming convention**: application and domain exception `name` fields use a bare label (e.g. `"Bad Request"`, `"Invalid Property"`), while infrastructure exception `name` fields use the `*Exception` suffix (e.g. `"Conflict Exception"`, `"Cache Unavailable Exception"`). This is intentional and preserved for log compatibility.

### Preserving the original error

Every concrete exception takes a trailing, optional `ErrorOptions`, so translating a low-level failure into a layer exception never throws the diagnosis away:

```typescript
try {
  await prisma.$connect();
} catch (error) {
  throw new DatabaseUnavailableException('postgres@boot', undefined, { cause: error });
}
```

Pass `undefined` as the message to keep the templated default. `cause` is the native `Error.cause`, so it shows up in formatted stack traces for free.

### Application layer

Errors related to business logic, request handling, and user input.

```typescript
import { BadRequestException } from '@roastery/terroir/exceptions/application';

throw new BadRequestException('UserController', 'Invalid input');
```

The layer ships one exception per HTTP error status registered by the IANA, so
a use-case can throw the exact failure without declaring local classes. Four
statuses keep their original domain-flavoured names — they are the canonical
class for that code, and no duplicate `NotFound`/`Conflict` class exists.

Each class exposes the status as `code`, so error middleware reads it straight off the exception instead of maintaining a parallel class-name→status table:

```typescript
if (err instanceof ApplicationException) set.status = err.code;
```

`code` is exclusive to this layer. `DomainException` and `InfraException` have no equivalent on purpose: a broken invariant or an unreachable database are transport-agnostic facts, and the application catalogue is the only one whose classes are *named after* HTTP statuses to begin with.

| Class | Status | When to use |
|-------|--------|-------------|
| `BadRequestException` | 400 | Invalid or malformed input |
| `UnauthorizedException` | 401 | Authentication required or failed |
| `PaymentRequiredException` | 402 | No subscription, credit or payment method |
| `ForbiddenException` | 403 | Authenticated but not permitted |
| `ResourceNotFoundException` | 404 | Requested resource does not exist |
| `MethodNotAllowedException` | 405 | Operation unsupported by the resource |
| `NotAcceptableException` | 406 | No representation satisfies the caller |
| `ProxyAuthenticationRequiredException` | 407 | Proxy credentials missing |
| `RequestTimeoutException` | 408 | Caller took too long to send the request |
| `ResourceAlreadyExistsException` | 409 | Duplicate resource creation attempt |
| `GoneException` | 410 | Resource permanently removed |
| `LengthRequiredException` | 411 | Payload sent without a declared length |
| `PreconditionFailedException` | 412 | Conditional pre-condition does not hold |
| `ContentTooLargeException` | 413 | Payload exceeds the accepted size |
| `UriTooLongException` | 414 | Identifier longer than accepted |
| `UnsupportedMediaTypeException` | 415 | Payload format cannot be decoded |
| `RangeNotSatisfiableException` | 416 | Requested range outside the resource |
| `ExpectationFailedException` | 417 | Declared expectation cannot be met |
| `ImATeapotException` | 418 | RFC 2324 — reserved, rarely appropriate |
| `MisdirectedRequestException` | 421 | Request reached the wrong instance |
| `UnprocessableContentException` | 422 | Well-formed but semantically invalid |
| `LockedException` | 423 | Resource locked by another operation |
| `FailedDependencyException` | 424 | A dependent request already failed |
| `TooEarlyException` | 425 | Request might be a replay |
| `UpgradeRequiredException` | 426 | Caller must switch protocol |
| `PreconditionRequiredException` | 428 | Request must be conditional |
| `TooManyRequestsException` | 429 | Rate limit exceeded |
| `RequestHeaderFieldsTooLargeException` | 431 | Request metadata too large |
| `UnavailableForLegalReasonsException` | 451 | Withheld because of a legal demand |
| `InternalServerErrorException` | 500 | Last-resort application-layer failure |
| `NotImplementedException` | 501 | Operation recognised but not implemented |
| `BadGatewayException` | 502 | Invalid response from an upstream service |
| `ServiceUnavailableException` | 503 | Overload, maintenance or degraded dependency |
| `GatewayTimeoutException` | 504 | Upstream service did not answer in time |
| `HttpVersionNotSupportedException` | 505 | Protocol version unsupported |
| `VariantAlsoNegotiatesException` | 506 | Content negotiation loops |
| `InsufficientStorageException` | 507 | Not enough storage to complete |
| `LoopDetectedException` | 508 | Infinite loop detected while processing |
| `NotExtendedException` | 510 | Request needs further extensions |
| `NetworkAuthenticationRequiredException` | 511 | Caller must authenticate with the network |
| `InvalidOperationException` | — | Operation not allowed in current state |

### Domain layer

Errors from domain model constraint violations.

```typescript
import { InvalidPropertyException } from '@roastery/terroir/exceptions/domain';

throw new InvalidPropertyException('email', 'UserEntity');
```

| Class | When to use |
|-------|-------------|
| `InvalidDomainDataException` | Domain invariant violated |
| `InvalidPropertyException` | Entity property failed validation |
| `OperationFailedException` | Domain operation could not complete |
| `ImmutablePropertyException` | Write targeted a sealed property (`id`, `createdAt`) |
| `PropertyNameCollisionException` | Blueprint property shadows a base-class member |
| `IncompleteIdentityException` | Entity carries part of its identity, not all |
| `InvalidEntityDefinitionException` | Entity/value-object definition unreadable |
| `CyclicEntityDefinitionException` | Blueprint references itself |

`ImmutablePropertyException` and `PropertyNameCollisionException` take the property name first, like `InvalidPropertyException`.

### Infrastructure layer

Errors from external services and I/O operations.

```typescript
import { DatabaseUnavailableException } from '@roastery/terroir/exceptions/infra';

throw new DatabaseUnavailableException('PostgresRepository');
```

| Class | When to use |
|-------|-------------|
| `DatabaseUnavailableException` | Database connection failed |
| `CacheUnavailableException` | Cache service unreachable |
| `UnexpectedCacheValueException` | Cache returned unexpected data |
| `ConflictException` | Unique constraint violation |
| `ForeignDependencyConstraintException` | Foreign key constraint violation |
| `ResourceNotFoundException` | Record not found in data store |
| `OperationNotAllowedException` | Operation rejected by data store |
| `InvalidEnvironmentException` | Missing or invalid environment config |
| `MissingPluginDependencyException` | Required plugin not registered |
| `DependencyNotWiredException` | Dependency was never injected during composition |
| `MigrationFailedException` | Schema migration could not be applied |
| `DuplicatePluginException` | Same plugin registered twice |
| `ExternalServiceUnavailableException` | Third-party or sibling service unreachable |
| `OperationTimeoutException` | Call exceeded its time budget |
| `CredentialsRejectedException` | Dependency refused the system's credentials |
| `TransactionFailedException` | Transaction rolled back |
| `WriteConflictException` | Deadlock or serialization failure — retryable |
| `OptimisticLockException` | Record changed since it was read |
| `StorageUnavailableException` | Object storage unreachable |
| `FileNotFoundException` | Path or object key does not exist |
| `FileWriteFailedException` | Write failed (no space, permission, closed fd) |

Three distinctions worth keeping straight, because collapsing them costs diagnosis time:

- **`OperationTimeoutException` vs `*UnavailableException`** — a timeout usually means the dependency is alive but saturated, which calls for backoff rather than failover.
- **`WriteConflictException` vs `TransactionFailedException`** — the first is retryable by definition (the database aborted one side so the caller could retry); the second will fail again if replayed unchanged.
- **`OptimisticLockException` vs `ResourceNotFoundException`** — the row exists, its revision moved. Reporting it as not-found makes callers delete-and-recreate when the fix is to re-read and re-apply.

### Internal exceptions

Rarely used directly — reserved for framework-level error handling.

```typescript
import { UnknownException, InvalidEntityDataException, InvalidObjectValueException } from '@roastery/terroir/exceptions';
```

### Base classes and type utilities

```typescript
// Extend these to create your own layer-specific exceptions
import { ApplicationException, DomainException, InfraException } from '@roastery/terroir/exceptions/models';

// Type utilities for mapping exception constructors by layer
import type { RoasteryExceptionKeysByLayer, RoasteryExceptionKeys, RoasteryExceptionRecords } from '@roastery/terroir/exceptions/types';
```

---

## Schema Validation

> **Side-effect**: importing `@roastery/terroir/schema` (or anything that transitively imports it, like `SchemaManager`) registers the custom string formats on TypeBox's global `FormatRegistry`. Registration is idempotent and happens exactly once per process.

Schemas are plain TypeBox values — there is no wrapper type to unwrap. Build them with `t` (or `Type`) and use TypeBox's own API on them:

```typescript
import { t } from '@roastery/terroir';
import { Value } from '@sinclair/typebox/value';
import type { Static } from '@sinclair/typebox';

const UserSchema = t.Object({
  id: t.String({ format: 'uuid' }),
  email: t.String({ format: 'email' }),
  slug: t.String({ format: 'slug' }),
  createdAt: t.String({ format: 'date-time' }),
});

type User = Static<typeof UserSchema>;

Value.Check(UserSchema, data); // boolean
```

### Dynamic schema loading

`SchemaManager` is the entry point for schemas that cross a serialization boundary — stored in a database, sent over the wire, or read from config. `JSON.stringify` drops the `[Kind]` symbol TypeBox uses to identify each node; `build` re-attaches it and compiles the result, so an invalid payload fails there rather than at the first validation.

```typescript
import { SchemaManager } from '@roastery/terroir/schema';
import type { TObject } from '@sinclair/typebox';

// Producer side
const wire = SchemaManager.serialize(UserSchema); // string

// Consumer side — a usable TypeBox schema, not a wrapper
const schema = SchemaManager.build<TObject>(wire);

SchemaManager.match(schema, data);      // boolean, via a cached compiled validator
SchemaManager.isSchema(unknownValue);   // boolean, never throws
```

> `match` compiles each schema once and caches the validator in a `WeakMap` keyed by the schema object. Treat a schema as immutable once it reaches `SchemaManager` — mutating it afterwards leaves the stale validator in place.

### Available string formats

Automatically registered when importing `@roastery/terroir/schema`:

| Format | Description |
|--------|-------------|
| `uuid` | UUID v7 (other versions are rejected) |
| `email` | Email address (RFC 5322) |
| `url` | Full URL with valid hostname |
| `simple-url` | Basic URL (no hostname requirement) |
| `slug` | URL slug (`kebab-case-only`) |
| `date-time` | ISO 8601 date-time string |
| `json` | Valid JSON string |

> The **uuid** format is v7-only by design — consumers can rely on the time-ordered prefix without runtime checks.

---

## Exports reference

```typescript
import { t, uuid } from '@roastery/terroir';                    // TypeBox and uuid namespaces (re-exports)
import { ... } from '@roastery/terroir/exceptions';             // internal exceptions (rare)
import { ... } from '@roastery/terroir/exceptions/application'; // application layer
import { ... } from '@roastery/terroir/exceptions/domain';      // domain layer
import { ... } from '@roastery/terroir/exceptions/infra';       // infra layer
import { ... } from '@roastery/terroir/exceptions/models';      // base classes
import type { ... } from '@roastery/terroir/exceptions/types';  // type utilities
import { ... } from '@roastery/terroir/symbols';                // Layer and the other well-known symbols
import { ... } from '@roastery/terroir/schema';                 // SchemaManager + format registrations
```

### Re-exports

`t` and `uuid` are re-exported for convenience, so you don't need to import them separately:

```typescript
import { t, uuid } from '@roastery/terroir';

const UserSchema = t.Object({
  id: t.String({ format: 'uuid' }),
  name: t.String(),
});

const id = uuid.v7();
```

---

## Development

```bash
# Run tests
bun run test:unit

# Run tests with coverage
bun run test:coverage

# Build for distribution
bun run build

# Check for unused exports and dependencies
bun run knip

# Full setup (build + bun link)
bun run setup
```

## License

MIT
