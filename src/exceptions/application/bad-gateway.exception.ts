import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when an upstream service orchestrated
 * by the use-case answered with a response the application cannot interpret.
 *
 * Translates naturally to an HTTP `502 Bad Gateway` response.
 *
 * @example
 * ```ts
 * import { BadGatewayException } from "@roastery/terroir/exceptions/application";
 *
 * throw new BadGatewayException("payments-gateway");
 * // → message: "Bad gateway response reached the payments-gateway application."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link GatewayTimeoutException}
 */
export class BadGatewayException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Bad Gateway";

	/** HTTP status this exception maps to. */
	public readonly code = 502;

	/**
	 * @param source - Identifier of the application/use-case that received
	 *   the invalid upstream response.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Bad gateway response reached the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
