/**
 * Symbol keying the architectural layer of an exception — `"internal"`,
 * `"domain"`, `"application"` or `"infra"`.
 *
 * Every exception class in this package declares it, which makes it the one
 * well-known symbol `terroir` both owns and uses. It acts as a type tag that
 * survives serialization and bundler renaming, so error-handling middleware
 * can route on the layer without `instanceof` chains or magic strings.
 *
 * @remarks
 * The description passed to `Symbol` is purely for debugging — equality is by
 * reference, so this exact constant must be re-used everywhere the
 * discriminator is read or written. Reading it through a locally re-declared
 * `Symbol("layer")` silently never matches.
 *
 * @example
 * ```ts
 * import { Layer } from "@roastery/terroir/symbols";
 *
 * function isInfraError(error: unknown): boolean {
 *   return (
 *     typeof error === "object" &&
 *     error !== null &&
 *     (error as Record<symbol, unknown>)[Layer] === "infra"
 *   );
 * }
 * ```
 *
 * @see `CoreException` in `@roastery/terroir/exceptions/core` — the abstract
 *   base that declares the property keyed by this symbol.
 * @see `CoreExceptionType` in `@roastery/terroir/exceptions/core/types` — the
 *   union of legal values stored under this key.
 */
export const Layer = Symbol("layer");
