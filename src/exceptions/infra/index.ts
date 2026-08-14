/**
 * Public barrel for every concrete exception that lives in the
 * **infrastructure layer** (databases, caches, external services, plugins).
 *
 * All classes exported here extend {@link InfraException} and therefore
 * report `[Layer] === "infra"`.
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

// Composition and boot
export { DependencyNotWiredException } from "./dependency-not-wired.exception";
export { MigrationFailedException } from "./migration-failed.exception";
export { DuplicatePluginException } from "./duplicate-plugin.exception";

// Reachability and credentials
export { ExternalServiceUnavailableException } from "./external-service-unavailable.exception";
export { OperationTimeoutException } from "./operation-timeout.exception";
export { CredentialsRejectedException } from "./credentials-rejected.exception";

// Transactional writes
export { TransactionFailedException } from "./transaction-failed.exception";
export { WriteConflictException } from "./write-conflict.exception";
export { OptimisticLockException } from "./optimistic-lock.exception";

// Object storage and filesystem
export { StorageUnavailableException } from "./storage-unavailable.exception";
export { FileNotFoundException } from "./file-not-found.exception";
export { FileWriteFailedException } from "./file-write-failed.exception";
