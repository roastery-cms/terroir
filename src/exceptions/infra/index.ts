/**
 * Public barrel for every concrete exception that lives in the
 * **infrastructure layer** (databases, caches, external services, plugins).
 *
 * All classes exported here extend {@link InfraException} and therefore
 * report `[ExceptionLayer] === "infra"`.
 *
 * @module @roastery/terroir/exceptions/infra
 * @see {@link InfraException}
 */
export { CacheUnavailableException } from "./cache-unavailable.exception";
export { ConflictException } from "./conflict.exception";
export { OperationNotAllowedException } from "./operation-not-allowed.exception";
export { DatabaseUnavailableException } from "./database-unavailable.exception";
export { ResourceNotFoundException } from "./resource-not-found.exception";
export { ForeignDependencyConstraintException } from "./foreign-dependency-constraint.exception";
export { UnexpectedCacheValueException } from "./unexpected-cache-value.exception";
export { MissingPluginDependencyException } from "./missing-plugin-dependency.exception";
export { InvalidEnvironmentException } from "./invalid-environment.exception";
