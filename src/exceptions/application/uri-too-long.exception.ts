import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the identifier supplied by the
 * caller is longer than the application is willing to interpret.
 *
 * Translates naturally to an HTTP `414 URI Too Long` response.
 *
 * @example
 * ```ts
 * import { UriTooLongException } from "@roastery/terroir/exceptions/application";
 *
 * throw new UriTooLongException("search-service");
 * // → message: "URI too long for the search-service application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class UriTooLongException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "URI Too Long";

	/** HTTP status this exception maps to. */
	public readonly code = 414;

	/**
	 * @param source - Identifier of the application/use-case that rejected
	 *   the identifier.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `URI too long for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
