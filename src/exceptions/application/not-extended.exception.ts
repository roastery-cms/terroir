import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the request must carry further
 * extensions before the application is able to fulfil it.
 *
 * Translates naturally to an HTTP `510 Not Extended` response.
 *
 * @example
 * ```ts
 * import { NotExtendedException } from "@roastery/terroir/exceptions/application";
 *
 * throw new NotExtendedException("extensions-gateway");
 * // → message: "Further extensions required for the extensions-gateway application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class NotExtendedException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Not Extended";

	/** HTTP status this exception maps to. */
	public readonly code = 510;

	/**
	 * @param source - Identifier of the application/use-case that requires
	 *   the extension.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Further extensions required for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
