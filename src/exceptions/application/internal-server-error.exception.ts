import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when a use-case fails for a reason it
 * cannot describe any more precisely — the last-resort failure of the
 * application layer.
 *
 * Translates naturally to an HTTP `500 Internal Server Error` response.
 *
 * @remarks
 * Prefer a specific exception whenever the failure mode is known; reach for
 * this one only when nothing better applies.
 *
 * @example
 * ```ts
 * import { InternalServerErrorException } from "@roastery/terroir/exceptions/application";
 *
 * throw new InternalServerErrorException("checkout-service");
 * // → message: "Internal server error in the checkout-service application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class InternalServerErrorException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Internal Server Error";

	/** HTTP status this exception maps to. */
	public readonly code = 500;

	/**
	 * @param source - Identifier of the application/use-case that failed.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Internal server error in the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
