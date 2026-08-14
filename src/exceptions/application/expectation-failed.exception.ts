import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when an expectation declared upfront by
 * the caller cannot be met by the use-case.
 *
 * Translates naturally to an HTTP `417 Expectation Failed` response.
 *
 * @example
 * ```ts
 * import { ExpectationFailedException } from "@roastery/terroir/exceptions/application";
 *
 * throw new ExpectationFailedException("uploads-service");
 * // → message: "Expectation failed for the uploads-service application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class ExpectationFailedException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Expectation Failed";

	/** HTTP status this exception maps to. */
	public readonly code = 417;

	/**
	 * @param source - Identifier of the application/use-case that could
	 *   not meet the expectation.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Expectation failed for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
