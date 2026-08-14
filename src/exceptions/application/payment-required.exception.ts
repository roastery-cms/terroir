import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when a use-case cannot proceed because
 * the caller has no active subscription, credit or payment method covering
 * the requested operation.
 *
 * Translates naturally to an HTTP `402 Payment Required` response.
 *
 * @example
 * ```ts
 * import { PaymentRequiredException } from "@roastery/terroir/exceptions/application";
 *
 * throw new PaymentRequiredException("billing-service");
 * // → message: "Payment required for the billing-service application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class PaymentRequiredException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Payment Required";

	/** HTTP status this exception maps to. */
	public readonly code = 402;

	/**
	 * @param source - Identifier of the application/use-case that requires
	 *   payment before proceeding.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Payment required for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
