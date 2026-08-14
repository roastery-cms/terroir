import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the protocol version used by the
 * caller is not supported by the application.
 *
 * Translates naturally to an HTTP `505 HTTP Version Not Supported` response.
 *
 * @example
 * ```ts
 * import { HttpVersionNotSupportedException } from "@roastery/terroir/exceptions/application";
 *
 * throw new HttpVersionNotSupportedException("edge-api");
 * // → message: "HTTP version not supported by the edge-api application."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link UpgradeRequiredException}
 */
export class HttpVersionNotSupportedException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "HTTP Version Not Supported";

	/** HTTP status this exception maps to. */
	public readonly code = 505;

	/**
	 * @param source - Identifier of the application/use-case that rejected
	 *   the protocol version.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `HTTP version not supported by the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
