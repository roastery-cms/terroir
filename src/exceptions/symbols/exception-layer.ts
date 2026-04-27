/**
 * Unique well-known {@link Symbol} used as the discriminator key on every
 * exception class in the package.
 *
 * The symbol acts as a type tag that survives JavaScript runtime introspection
 * and bundler renaming, allowing consumers to identify the architectural layer
 * of any thrown exception (`internal`, `domain`, `application`, `infra`)
 * without relying on `instanceof` chains or magic strings.
 *
 * @remarks
 * The description passed to {@link Symbol} is purely for debugging — equality
 * is by reference, so this exact constant must be re-used everywhere the
 * discriminator is read or written.
 *
 * @example
 * ```ts
 * import { ExceptionLayer } from "@roastery/terroir/exceptions/symbols";
 *
 * function isInfraError(error: unknown): boolean {
 *   return (
 *     typeof error === "object" &&
 *     error !== null &&
 *     (error as Record<symbol, unknown>)[ExceptionLayer] === "infra"
 *   );
 * }
 * ```
 *
 * @see {@link CoreException} — abstract base class that declares the property keyed by this symbol.
 * @see {@link CoreExceptionType} — union type of the legal values stored under this key.
 */
export const ExceptionLayer = Symbol("exception:layer");
