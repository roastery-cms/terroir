import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the payload sent by the caller
 * exceeds the size the use-case is willing to accept.
 *
 * Translates naturally to an HTTP `413 Content Too Large` response.
 *
 * @example
 * ```ts
 * import { ContentTooLargeException } from "@roastery/terroir/exceptions/application";
 *
 * throw new ContentTooLargeException("uploads-service");
 * // → message: "Content too large for the uploads-service application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class ContentTooLargeException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Content Too Large";

	/** HTTP status this exception maps to. */
	public readonly code = 413;

	/**
	 * @param source - Identifier of the application/use-case that enforces
	 *   the size limit.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Content too large for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
