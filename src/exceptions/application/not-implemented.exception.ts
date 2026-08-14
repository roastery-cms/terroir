import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the requested operation is
 * recognised by the application but has no implementation yet.
 *
 * Translates naturally to an HTTP `501 Not Implemented` response.
 *
 * @example
 * ```ts
 * import { NotImplementedException } from "@roastery/terroir/exceptions/application";
 *
 * throw new NotImplementedException("reports-service");
 * // → message: "Operation not implemented in the reports-service application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class NotImplementedException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Not Implemented";

	/** HTTP status this exception maps to. */
	public readonly code = 501;

	/**
	 * @param source - Identifier of the application/use-case missing the
	 *   implementation.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Operation not implemented in the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
