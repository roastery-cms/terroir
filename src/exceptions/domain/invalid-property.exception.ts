import { DomainException } from "@/exceptions/models";

/**
 * Domain-layer exception thrown when a single named property of an entity or
 * value object fails its validation rule (range, format, presence, …).
 *
 * Carries the offending property name as a first-class field so callers can
 * map the failure to a structured error response.
 *
 * @example
 * ```ts
 * import { InvalidPropertyException } from "@roastery/terroir/exceptions/domain";
 *
 * throw new InvalidPropertyException("email", "users");
 * // → message: "The property 'email' in users is invalid."
 * ```
 *
 * @see {@link DomainException}
 * @see {@link InvalidDomainDataException}
 */
export class InvalidPropertyException extends DomainException {
	/** Human-readable label for the exception class. */
	public readonly name = "Invalid Property";

	/**
	 * @param property - Name of the property that failed validation
	 *   (interpolated into the default message).
	 * @param source - Identifier of the domain or entity the property belongs
	 *   to.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references both {@link property} and {@link source}.
	 */
	constructor(
		public readonly property: string,
		public readonly source: string,
		public readonly message: string = `The property '${property}' in ${source} is invalid.`,
	) {
		super(message);
	}
}
