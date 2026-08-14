import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the use-case cannot produce a
 * representation that satisfies the content-negotiation constraints declared
 * by the caller.
 *
 * Translates naturally to an HTTP `406 Not Acceptable` response.
 *
 * @example
 * ```ts
 * import { NotAcceptableException } from "@roastery/terroir/exceptions/application";
 *
 * throw new NotAcceptableException("reports-service");
 * // → message: "No acceptable representation available for the reports-service application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class NotAcceptableException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Not Acceptable";

	/** HTTP status this exception maps to. */
	public readonly code = 406;

	/**
	 * @param source - Identifier of the application/use-case that could
	 *   not satisfy the negotiation.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `No acceptable representation available for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
