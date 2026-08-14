import { Layer } from "@/symbols";
import { CoreException, type CoreExceptionType } from "../core";

/**
 * Abstract base for every exception thrown from the **application layer**
 * (use-cases, controllers, command handlers, request orchestration).
 *
 * The class fixes `[Layer]` to `"application"`, leaving subclasses responsible
 * only for `name`, `message` and `source` (and any extra fields specific to
 * the failure mode).
 *
 * @remarks
 * Application exceptions typically carry semantics suited for HTTP
 * `4xx`-style responses (bad request, unauthorized, resource conflicts) but
 * they are transport-agnostic — they simply describe that the use-case
 * itself rejected the request.
 *
 * @example
 * ```ts
 * import { ApplicationException } from "@roastery/terroir/exceptions/models";
 *
 * export class TooManyAttemptsException extends ApplicationException {
 *   public readonly name = "Too Many Attempts";
 *
 *   constructor(
 *     public readonly source: string,
 *     public readonly message = `Too many attempts on ${source}.`,
 *   ) {
 *     super(message);
 *   }
 * }
 * ```
 *
 * @see {@link CoreException}
 * @see {@link DomainException}
 * @see {@link InfraException}
 */
export abstract class ApplicationException extends CoreException {
	/**
	 * Layer discriminator pinned to `"application"`. Sealed by this abstract
	 * class so concrete subclasses do not need to assign it themselves.
	 */
	public override readonly [Layer]: CoreExceptionType = "application";

	/**
	 * HTTP status this exception maps to.
	 *
	 * @remarks
	 * Exclusive to the application layer. `DomainException` and
	 * `InfraException` deliberately have no equivalent: a broken invariant or
	 * an unreachable database are transport-agnostic facts, and teaching them
	 * about HTTP would leak the delivery mechanism into layers that must not
	 * know it exists.
	 *
	 * The application layer is the exception because its catalogue *is* the
	 * IANA HTTP error registry — `ForbiddenException` and
	 * `GatewayTimeoutException` are named after the statuses they represent.
	 * The coupling is already in the class name; this field only stops hiding
	 * it, so error middleware can read `error.code` instead of maintaining a
	 * parallel class-name→status table that breaks every time a class is
	 * added.
	 */
	public abstract readonly code: number;
}
