import { Layer } from "@/symbols";
import type { CoreExceptionType } from "./types/core-exception-type";

/**
 * Root abstract class of every exception type in `@roastery/terroir`.
 *
 * `CoreException` extends the native {@link Error} and adds a uniform contract
 * that all subclasses must satisfy: an immutable `name`, an immutable
 * `message`, an identifier for the originating module/component (`source`),
 * and a layer discriminator stored under the {@link Layer} symbol.
 *
 * @remarks
 * - Subclasses are organised by architectural layer. Concrete classes do not
 *   extend `CoreException` directly; they extend one of the abstract layer
 *   classes (`ApplicationException`, `DomainException`, `InfraException`),
 *   which fix the value of `[Layer]`. Internal exceptions are the exception
 *   to that rule and extend this class directly.
 * - A naming convention exists for the `name` field: application/domain
 *   exceptions use a bare label (e.g. `"Bad Request"`) while infra exceptions
 *   suffix `"Exception"` (e.g. `"Cache Unavailable Exception"`). This is
 *   preserved for runtime/log compatibility and intentionally not normalised.
 * - Every concrete subclass takes a trailing, optional `ErrorOptions`, so the
 *   native {@link Error.cause} slot is always available. Translating a
 *   low-level failure into a layer exception must not throw the original
 *   away — pass it through as `cause` and the diagnosis survives the trip up
 *   the stack.
 *
 * @example
 * ```ts
 * try {
 *   await prisma.$connect();
 * } catch (error) {
 *   throw new DatabaseUnavailableException("postgres@boot", undefined, {
 *     cause: error,
 *   });
 * }
 * ```
 *
 * @example
 * ```ts
 * import { CoreException } from "@roastery/terroir/exceptions/core";
 * import { Layer } from "@roastery/terroir/symbols";
 *
 * class CustomFrameworkError extends CoreException {
 *   public readonly [Layer] = "internal" as const;
 *   public readonly name = "Custom Framework Error";
 *   public readonly source = "$internal";
 *
 *   constructor(public readonly message = "Something framework-level broke.") {
 *     super(message);
 *   }
 * }
 * ```
 *
 * @see {@link CoreExceptionType} — legal values for `[Layer]`.
 * @see {@link Layer} — symbol key used for the layer discriminator.
 */
export abstract class CoreException extends Error {
	/**
	 * Layer tag identifying which architectural layer threw the exception.
	 *
	 * Concrete subclasses must initialise this with one of the
	 * {@link CoreExceptionType} string literals (typically through one of the
	 * abstract layer classes such as `ApplicationException`).
	 */
	public abstract readonly [Layer]: CoreExceptionType;

	/**
	 * Human-readable, immutable label for the exception class — overrides
	 * {@link Error.name} so it shows up first in formatted stack traces and
	 * structured logs.
	 */
	public abstract override readonly name: string;

	/**
	 * Immutable explanatory message describing what went wrong. Mirrors the
	 * value passed to `super(message)` and overrides {@link Error.message} to
	 * make the immutability part of the public type contract.
	 */
	public abstract override readonly message: string;

	/**
	 * Identifier of the module, feature, or resource the exception is
	 * attributed to (e.g. `"user-service"`, `"$internal"`). Used for log
	 * correlation and for templating default messages.
	 */
	public abstract readonly source: string;
}
