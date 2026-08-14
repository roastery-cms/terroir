import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when a third-party or sibling
 * service the system depends on cannot be reached, or answers in a way that
 * cannot be interpreted.
 *
 * @remarks
 * Covers what {@link DatabaseUnavailableException} and {@link
 * CacheUnavailableException} do for their own backends: any HTTP dependency,
 * message broker, mailer or neighbouring microservice.
 *
 * @example
 * ```ts
 * import { ExternalServiceUnavailableException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new ExternalServiceUnavailableException("models-api");
 * // → message: "The models-api external service is currently unavailable."
 * ```
 *
 * @see {@link InfraException}
 * @see {@link DatabaseUnavailableException}
 * @see {@link OperationTimeoutException}
 */
export class ExternalServiceUnavailableException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "External Service Unavailable Exception";

	/**
	 * @param source - Identifier of the external service (e.g.
	 *   `"models-api"`, `"mailer"`).
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `The ${source} external service is currently unavailable.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
