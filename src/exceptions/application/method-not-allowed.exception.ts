import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the target resource exists but
 * does not support the operation the caller tried to perform on it.
 *
 * Translates naturally to an HTTP `405 Method Not Allowed` response.
 *
 * @example
 * ```ts
 * import { MethodNotAllowedException } from "@roastery/terroir/exceptions/application";
 *
 * throw new MethodNotAllowedException("orders");
 * // → message: "Method not allowed for the orders application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class MethodNotAllowedException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Method Not Allowed";

	/** HTTP status this exception maps to. */
	public readonly code = 405;

	/**
	 * @param source - Identifier of the application/use-case that rejected
	 *   the operation.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Method not allowed for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
