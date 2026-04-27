import { DomainException } from "@/exceptions/models";

/**
 * Domain-layer exception thrown when a domain operation completes in a
 * failure state that is not attributable to invalid input — for example,
 * when a state-machine transition is not allowed for the current aggregate
 * state.
 *
 * @example
 * ```ts
 * import { OperationFailedException } from "@roastery/terroir/exceptions/domain";
 *
 * throw new OperationFailedException("orders");
 * // → message: "Operation failed in the orders domain."
 * ```
 *
 * @see {@link DomainException}
 */
export class OperationFailedException extends DomainException {
	/** Human-readable label for the exception class. */
	public readonly name = "Operation Failed";

	/**
	 * @param source - Identifier of the domain in which the operation failed.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Operation failed in the ${source} domain.`,
	) {
		super(message);
	}
}
