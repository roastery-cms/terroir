import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the request must first
 * authenticate against an intermediate proxy before it is allowed to reach
 * the use-case.
 *
 * Translates naturally to an HTTP `407 Proxy Authentication Required` response.
 *
 * @example
 * ```ts
 * import { ProxyAuthenticationRequiredException } from "@roastery/terroir/exceptions/application";
 *
 * throw new ProxyAuthenticationRequiredException("gateway");
 * // → message: "Proxy authentication required for the gateway application."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link UnauthorizedException}
 */
export class ProxyAuthenticationRequiredException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Proxy Authentication Required";

	/** HTTP status this exception maps to. */
	public readonly code = 407;

	/**
	 * @param source - Identifier of the application/use-case sitting
	 *   behind the proxy.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Proxy authentication required for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
