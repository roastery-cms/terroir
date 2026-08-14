import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the application is temporarily
 * unable to handle the request — overload, maintenance window, or a degraded
 * dependency.
 *
 * Translates naturally to an HTTP `503 Service Unavailable` response.
 *
 * @example
 * ```ts
 * import { ServiceUnavailableException } from "@roastery/terroir/exceptions/application";
 *
 * throw new ServiceUnavailableException("checkout-service");
 * // → message: "Service unavailable for the checkout-service application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class ServiceUnavailableException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Service Unavailable";

	/** HTTP status this exception maps to. */
	public readonly code = 503;

	/**
	 * @param source - Identifier of the application/use-case that is
	 *   unavailable.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Service unavailable for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
