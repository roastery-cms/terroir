import { DomainException } from "@/exceptions/models";

/**
 * Domain-layer exception thrown when the declaration that describes an
 * entity or value object cannot be read — most often because it was written
 * as a class field instead of a prototype method, so its initialiser only
 * runs after `super()` has already asked for it.
 *
 * @example
 * ```ts
 * import { InvalidEntityDefinitionException } from "@roastery/terroir/exceptions/domain";
 *
 * throw new InvalidEntityDefinitionException("post");
 * // → message: "The definition of post is invalid or unreadable."
 * ```
 *
 * @see {@link DomainException}
 * @see {@link CyclicEntityDefinitionException}
 */
export class InvalidEntityDefinitionException extends DomainException {
	/** Human-readable label for the exception class. */
	public readonly name = "Invalid Entity Definition";

	/**
	 * @param source - Identifier of the entity or value object being
	 *   defined.
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `The definition of ${source} is invalid or unreadable.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
