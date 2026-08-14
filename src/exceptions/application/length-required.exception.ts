import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the caller sent a payload without
 * declaring its length and the use-case refuses to process it.
 *
 * Translates naturally to an HTTP `411 Length Required` response.
 *
 * @example
 * ```ts
 * import { LengthRequiredException } from "@roastery/terroir/exceptions/application";
 *
 * throw new LengthRequiredException("uploads-service");
 * // → message: "Content length required for the uploads-service application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class LengthRequiredException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Length Required";

	/** HTTP status this exception maps to. */
	public readonly code = 411;

	/**
	 * @param source - Identifier of the application/use-case that requires
	 *   the declared length.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Content length required for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
