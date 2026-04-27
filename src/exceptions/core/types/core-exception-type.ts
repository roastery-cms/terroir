/**
 * String literal union identifying which architectural layer an exception
 * originates from.
 *
 * Stored on every exception under the {@link ExceptionLayer} symbol, this
 * value is the runtime discriminator used by error-handling middleware,
 * logging adapters and HTTP layers to decide how an error should be reported,
 * mapped to a status code, or surfaced to the caller.
 *
 * @remarks
 * Each member maps to a directory of concrete exception classes under
 * `src/exceptions/<layer>/`:
 *
 * | Value          | Meaning                                                                |
 * | -------------- | ---------------------------------------------------------------------- |
 * | `"internal"`   | Failures that originate inside the framework itself (entity validation, unknown errors, invalid object values). Not tied to a specific business layer. |
 * | `"domain"`     | Business-rule violations (invalid property, operation failed, invalid domain data). |
 * | `"application"`| Use-case / orchestration failures (bad request, unauthorized, JWT issues). |
 * | `"infra"`      | Infrastructure failures (database/cache unavailable, conflict, missing plugin dependency). |
 *
 * @example
 * ```ts
 * import type { CoreExceptionType } from "@roastery/terroir/exceptions/core";
 *
 * function statusFor(layer: CoreExceptionType): number {
 *   switch (layer) {
 *     case "application": return 400;
 *     case "domain":      return 422;
 *     case "infra":       return 503;
 *     case "internal":    return 500;
 *   }
 * }
 * ```
 *
 * @see {@link CoreException} — base class that exposes a property of this type.
 * @see {@link ExceptionLayer} — symbol key under which a value of this type is stored.
 */
export type CoreExceptionType = "internal" | "domain" | "application" | "infra";
