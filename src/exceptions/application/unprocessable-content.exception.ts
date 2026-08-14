import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the payload is syntactically
 * well-formed but fails the semantic validation performed by the use-case.
 *
 * Translates naturally to an HTTP `422 Unprocessable Content` response.
 *
 * @remarks
 * Distinct from {@link BadRequestException}: the request could be parsed, it
 * just describes a state the use-case cannot accept.
 *
 * @example
 * ```ts
 * import { UnprocessableContentException } from "@roastery/terroir/exceptions/application";
 *
 * throw new UnprocessableContentException("users");
 * // → message: "Unprocessable content for the users application."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link BadRequestException}
 */
export class UnprocessableContentException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Unprocessable Content";

	/** HTTP status this exception maps to. */
	public readonly code = 422;

	/**
	 * @param source - Identifier of the application/use-case that rejected
	 *   the content.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Unprocessable content for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
