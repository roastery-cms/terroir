import { ExceptionLayer } from "@/exceptions/symbols";
import { CoreException, type CoreExceptionType } from "../core";

/**
 * Abstract base for every exception thrown from the **application layer**
 * (use-cases, controllers, command handlers, request orchestration).
 *
 * The class fixes `[ExceptionLayer]` to `"application"`, leaving subclasses
 * responsible only for `name`, `message` and `source` (and any extra fields
 * specific to the failure mode).
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
	public override readonly [ExceptionLayer]: CoreExceptionType = "application";
}
