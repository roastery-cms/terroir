import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the caller has exceeded the rate
 * limit allotted to it.
 *
 * Translates naturally to an HTTP `429 Too Many Requests` response.
 *
 * @example
 * ```ts
 * import { TooManyRequestsException } from "@roastery/terroir/exceptions/application";
 *
 * throw new TooManyRequestsException("public-api");
 * // → message: "Too many requests for the public-api application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class TooManyRequestsException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Too Many Requests";

	/** HTTP status this exception maps to. */
	public readonly code = 429;

	/**
	 * @param source - Identifier of the application/use-case that enforces
	 *   the rate limit.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Too many requests for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
