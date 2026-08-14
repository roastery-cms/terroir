import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the metadata accompanying the
 * request is larger than the application is willing to process.
 *
 * Translates naturally to an HTTP `431 Request Header Fields Too Large` response.
 *
 * @example
 * ```ts
 * import { RequestHeaderFieldsTooLargeException } from "@roastery/terroir/exceptions/application";
 *
 * throw new RequestHeaderFieldsTooLargeException("edge-api");
 * // → message: "Request header fields too large for the edge-api application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class RequestHeaderFieldsTooLargeException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Request Header Fields Too Large";

	/** HTTP status this exception maps to. */
	public readonly code = 431;

	/**
	 * @param source - Identifier of the application/use-case that rejected
	 *   the request metadata.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Request header fields too large for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
