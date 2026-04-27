import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when a request reaches a use-case with
 * shape, parameters or pre-conditions that are syntactically valid but
 * semantically rejected by the use-case itself.
 *
 * Translates naturally to an HTTP `400 Bad Request` response.
 *
 * @example
 * ```ts
 * import { BadRequestException } from "@roastery/terroir/exceptions/application";
 *
 * throw new BadRequestException("checkout-service");
 * // → message: "Bad request for the checkout-service application."
 *
 * throw new BadRequestException("checkout-service", "Cart is empty.");
 * ```
 *
 * @see {@link ApplicationException}
 */
export class BadRequestException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Bad Request";

	/**
	 * @param source - Identifier of the application/use-case that rejected the
	 *   request (used for log correlation and the default message template).
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Bad request for the ${source} application.`,
	) {
		super(message);
	}
}
