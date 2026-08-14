import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when an upstream service the use-case
 * depends on did not answer within the allotted time.
 *
 * Translates naturally to an HTTP `504 Gateway Timeout` response.
 *
 * @example
 * ```ts
 * import { GatewayTimeoutException } from "@roastery/terroir/exceptions/application";
 *
 * throw new GatewayTimeoutException("payments-gateway");
 * // → message: "Gateway timed out for the payments-gateway application."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link RequestTimeoutException}
 */
export class GatewayTimeoutException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Gateway Timeout";

	/** HTTP status this exception maps to. */
	public readonly code = 504;

	/**
	 * @param source - Identifier of the application/use-case that was
	 *   waiting on the upstream service.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Gateway timed out for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
