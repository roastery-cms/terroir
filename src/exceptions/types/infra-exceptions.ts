import type * as Exceptions from "@/exceptions/infra";

/**
 * Union of every exception class name exported from `@/exceptions/infra`.
 *
 * Derived with `keyof typeof` so the union expands automatically whenever a
 * new infrastructure exception is added to the barrel.
 *
 * @example
 * ```ts
 * import type { InfraExceptions } from "@roastery/terroir/exceptions/types";
 *
 * // InfraExceptions is e.g.
 * //   | "CacheUnavailableException"
 * //   | "ConflictException"
 * //   | "DatabaseUnavailableException"
 * //   | "ForeignDependencyConstraintException"
 * //   | "InvalidEnvironmentException"
 * //   | "MissingPluginDependencyException"
 * //   | "OperationNotAllowedException"
 * //   | "ResourceNotFoundException"
 * //   | "UnexpectedCacheValueException"
 * ```
 *
 * @see {@link RoasteryExceptionKeys}
 * @see {@link RoasteryExceptionKeysByLayer}
 */
export type InfraExceptions = keyof typeof Exceptions;
