import type * as Exceptions from "@/exceptions/domain";

/**
 * Union of every exception class name exported from `@/exceptions/domain`.
 *
 * Derived with `keyof typeof` so the union expands automatically whenever a
 * new domain exception is added to the barrel.
 *
 * @example
 * ```ts
 * import type { DomainExceptions } from "@roastery/terroir/exceptions/types";
 *
 * // DomainExceptions is e.g.
 * //   | "InvalidDomainDataException"
 * //   | "InvalidPropertyException"
 * //   | "OperationFailedException"
 * ```
 *
 * @see {@link RoasteryExceptionKeys}
 * @see {@link RoasteryExceptionKeysByLayer}
 */
export type DomainExceptions = keyof typeof Exceptions;
