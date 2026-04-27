/**
 * Type-level catalogue of every exception class exposed by the package,
 * grouped by architectural layer.
 *
 * The helpers in this module derive their members from the barrel files of
 * each layer with `keyof typeof`, so the catalogue stays in lock-step with
 * the runtime exports without any manual bookkeeping.
 *
 * @module @roastery/terroir/exceptions/types
 */

import type { CoreExceptionType } from "@/exceptions/core";
import type * as InternalErrors from "@/exceptions/index";

import type { DomainExceptions } from "./domain-exceptions";
import type { ApplicationExceptions } from "./application-exceptions";
import type { InfraExceptions } from "./infra-exceptions";

/**
 * Mapping from {@link CoreExceptionType} layer names to the union of class
 * names defined in that layer's barrel.
 *
 * Use this when you need a layered registry — for example, to build a
 * lookup table of HTTP status codes keyed by layer and exception name.
 *
 * @example
 * ```ts
 * import type { RoasteryExceptionKeysByLayer } from "@roastery/terroir/exceptions/types";
 *
 * type AllInfra = RoasteryExceptionKeysByLayer["infra"];
 * //   ^? "CacheUnavailableException" | "ConflictException" | ...
 * ```
 *
 * @see {@link RoasteryExceptionKeys}
 * @see {@link RoasteryExceptionRecords}
 */
export type RoasteryExceptionKeysByLayer = {
	internal: keyof typeof InternalErrors;
	domain: DomainExceptions;
	application: ApplicationExceptions;
	infra: InfraExceptions;
};

/**
 * Looks up the union of exception class names that belong to a single layer.
 *
 * Equivalent to `RoasteryExceptionKeysByLayer[T]`, exposed as a generic for
 * convenience and so it can be used directly in type parameter constraints.
 *
 * @typeParam T - The {@link CoreExceptionType} layer to query.
 *
 * @example
 * ```ts
 * import type { RoasteryExceptionKeys } from "@roastery/terroir/exceptions/types";
 *
 * type DomainNames = RoasteryExceptionKeys<"domain">;
 * //   ^? "InvalidDomainDataException" | "InvalidPropertyException" | "OperationFailedException"
 * ```
 *
 * @see {@link RoasteryExceptionKeysByLayer}
 */
export type RoasteryExceptionKeys<T extends CoreExceptionType> =
	RoasteryExceptionKeysByLayer[T];

/**
 * Builds, for every layer, a {@link Record} keyed by that layer's exception
 * class names and valued with `T`.
 *
 * Useful for declarative registries that must provide an entry for every
 * known exception in every layer (e.g. a complete logger config or HTTP
 * status mapper). TypeScript will refuse to compile if any class is missing.
 *
 * @typeParam T - The value type stored against each exception name.
 *
 * @example
 * ```ts
 * import type { RoasteryExceptionRecords } from "@roastery/terroir/exceptions/types";
 *
 * const httpStatuses: RoasteryExceptionRecords<number> = {
 *   internal: { InvalidEntityDataException: 500, InvalidObjectValueException: 500, UnknownException: 500 },
 *   domain:   { InvalidDomainDataException: 422, InvalidPropertyException: 422, OperationFailedException: 422 },
 *   application: {
 *     BadRequestException: 400,
 *     InvalidJWTException: 401,
 *     InvalidOperationException: 400,
 *     ResourceAlreadyExistsException: 409,
 *     ResourceNotFoundException: 404,
 *     UnableToSignPayloadException: 500,
 *     UnauthorizedException: 401,
 *   },
 *   infra: {
 *     CacheUnavailableException: 503,
 *     ConflictException: 409,
 *     DatabaseUnavailableException: 503,
 *     ForeignDependencyConstraintException: 409,
 *     InvalidEnvironmentException: 500,
 *     MissingPluginDependencyException: 500,
 *     OperationNotAllowedException: 403,
 *     ResourceNotFoundException: 404,
 *     UnexpectedCacheValueException: 500,
 *   },
 * };
 * ```
 *
 * @see {@link RoasteryExceptionKeysByLayer}
 */
export type RoasteryExceptionRecords<T> = {
	[Key in keyof RoasteryExceptionKeysByLayer]: Record<
		RoasteryExceptionKeysByLayer[Key],
		T
	>;
};
