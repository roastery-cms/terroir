import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the use-case refuses to process a
 * request that it suspects might be replayed.
 *
 * Translates naturally to an HTTP `425 Too Early` response.
 *
 * @example
 * ```ts
 * import { TooEarlyException } from "@roastery/terroir/exceptions/application";
 *
 * throw new TooEarlyException("auth-service");
 * // → message: "Request replayed too early for the auth-service application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class TooEarlyException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Too Early";

	/** HTTP status this exception maps to. */
	public readonly code = 425;

	/**
	 * @param source - Identifier of the application/use-case that refused
	 *   the early request.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Request replayed too early for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
