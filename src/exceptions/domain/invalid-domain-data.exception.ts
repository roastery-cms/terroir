import { DomainException } from "@/exceptions/models";

/**
 * Domain-layer exception thrown when an entity, value object or aggregate is
 * constructed (or mutated) with data that violates its invariants in a way
 * that cannot be attributed to a single named property.
 *
 * @remarks
 * Use {@link InvalidPropertyException} when the failure is localised to one
 * specific field; use this class for cross-field rules and aggregate-level
 * invariants.
 *
 * @example
 * ```ts
 * import { InvalidDomainDataException } from "@roastery/terroir/exceptions/domain";
 *
 * throw new InvalidDomainDataException("orders");
 * // → message: "Invalid data provided for the orders domain."
 * ```
 *
 * @see {@link DomainException}
 * @see {@link InvalidPropertyException}
 */
export class InvalidDomainDataException extends DomainException {
	/** Human-readable label for the exception class. */
	public readonly name = "Invalid Domain Data";

	/**
	 * @param source - Identifier of the domain in which the invariant was
	 *   broken (used in the default message template).
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Invalid data provided for the ${source} domain.`,
	) {
		super(message);
	}
}
