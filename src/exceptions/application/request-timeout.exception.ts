import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the caller took longer than
 * allowed to produce the request and the application stopped waiting for it.
 *
 * Translates naturally to an HTTP `408 Request Timeout` response.
 *
 * @remarks
 * Distinct from {@link GatewayTimeoutException}, which describes an
 * *upstream* dependency that timed out rather than the caller.
 *
 * @example
 * ```ts
 * import { RequestTimeoutException } from "@roastery/terroir/exceptions/application";
 *
 * throw new RequestTimeoutException("uploads-service");
 * // → message: "Request timed out for the uploads-service application."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link GatewayTimeoutException}
 */
export class RequestTimeoutException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Request Timeout";

	/** HTTP status this exception maps to. */
	public readonly code = 408;

	/**
	 * @param source - Identifier of the application/use-case that gave up
	 *   waiting.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Request timed out for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
