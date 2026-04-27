import type * as Exceptions from "@/exceptions/application";

/**
 * Union of every exception class name exported from
 * `@/exceptions/application`.
 *
 * The type is derived with `keyof typeof` so that any class added to the
 * application barrel is automatically picked up by helpers such as
 * {@link RoasteryExceptionRecords} — there is no second list to keep in sync.
 *
 * @example
 * ```ts
 * import type { ApplicationExceptions } from "@roastery/terroir/exceptions/types";
 *
 * // ApplicationExceptions is e.g.
 * //   | "BadRequestException"
 * //   | "InvalidJWTException"
 * //   | "InvalidOperationException"
 * //   | "ResourceAlreadyExistsException"
 * //   | "ResourceNotFoundException"
 * //   | "UnableToSignPayloadException"
 * //   | "UnauthorizedException"
 *
 * const handlers: Record<ApplicationExceptions, (error: Error) => void> = {
 *   // ...
 * };
 * ```
 *
 * @see {@link RoasteryExceptionKeys}
 * @see {@link RoasteryExceptionKeysByLayer}
 */
export type ApplicationExceptions = keyof typeof Exceptions;
