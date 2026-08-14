import { DomainException } from "@/exceptions/models";

/**
 * Domain-layer exception thrown when a write targets a property that the
 * entity declares immutable — identity fields such as `id` and `createdAt`,
 * or any value sealed after creation.
 *
 * @remarks
 * Distinct from {@link InvalidPropertyException}: the property exists and
 * the value may be perfectly valid; what is refused is the write itself.
 *
 * @example
 * ```ts
 * import { ImmutablePropertyException } from "@roastery/terroir/exceptions/domain";
 *
 * throw new ImmutablePropertyException("id", "post");
 * // → message: "The property 'id' in post is immutable."
 * ```
 *
 * @see {@link DomainException}
 * @see {@link InvalidPropertyException}
 */
export class ImmutablePropertyException extends DomainException {
	/** Human-readable label for the exception class. */
	public readonly name = "Immutable Property";

	/**
	 * @param property - Name of the immutable property that a write
	 *   targeted (interpolated into the default message).
	 * @param source - Identifier of the entity or domain the property
	 *   belongs to.
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly property: string,
		public readonly source: string,
		public readonly message: string = `The property '${property}' in ${source} is immutable.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
