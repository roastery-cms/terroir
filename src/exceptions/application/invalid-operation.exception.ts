import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when a use-case is invoked in a state
 * where the requested operation is not allowed (for example, an attempt to
 * cancel an order that has already been shipped).
 *
 * Distinct from {@link BadRequestException}: the input itself is valid, the
 * problem is the *current state* of the application.
 *
 * @example
 * ```ts
 * import { InvalidOperationException } from "@roastery/terroir/exceptions/application";
 *
 * throw new InvalidOperationException("orders");
 * // → message: "Invalid operation for the orders application."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link BadRequestException}
 */
export class InvalidOperationException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Invalid Operation";

	/**
	 * @param source - Identifier of the application/use-case that rejected the
	 *   operation.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Invalid operation for the ${source} application.`,
	) {
		super(message);
	}
}
