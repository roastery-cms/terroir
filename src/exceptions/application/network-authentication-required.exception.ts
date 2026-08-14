import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the caller must authenticate with
 * the network itself (captive portal, corporate proxy) before it can reach
 * the application.
 *
 * Translates naturally to an HTTP `511 Network Authentication Required` response.
 *
 * @example
 * ```ts
 * import { NetworkAuthenticationRequiredException } from "@roastery/terroir/exceptions/application";
 *
 * throw new NetworkAuthenticationRequiredException("captive-portal");
 * // → message: "Network authentication required for the captive-portal application."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link UnauthorizedException}
 * @see {@link ProxyAuthenticationRequiredException}
 */
export class NetworkAuthenticationRequiredException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Network Authentication Required";

	/** HTTP status this exception maps to. */
	public readonly code = 511;

	/**
	 * @param source - Identifier of the application/use-case unreachable
	 *   until the network authenticates the caller.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Network authentication required for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
