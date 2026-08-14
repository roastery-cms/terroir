import { DomainException } from "@/exceptions/models";

/**
 * Domain-layer exception thrown when a blueprint property would shadow a
 * member the base class already provides (`id`, `schema`, `toJSON`, `set`,
 * …), so the accessor cannot be installed.
 *
 * @remarks
 * Rename the domain property. Installing it anyway would silently replace
 * framework behaviour with a data field.
 *
 * @example
 * ```ts
 * import { PropertyNameCollisionException } from "@roastery/terroir/exceptions/domain";
 *
 * throw new PropertyNameCollisionException("schema", "post");
 * // → message: "The property 'schema' in post collides with an existing member."
 * ```
 *
 * @see {@link DomainException}
 * @see {@link InvalidEntityDefinitionException}
 */
export class PropertyNameCollisionException extends DomainException {
	/** Human-readable label for the exception class. */
	public readonly name = "Property Name Collision";

	/**
	 * @param property - Name of the colliding blueprint property
	 *   (interpolated into the default message).
	 * @param source - Identifier of the entity that declares the property.
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly property: string,
		public readonly source: string,
		public readonly message: string = `The property '${property}' in ${source} collides with an existing member.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
