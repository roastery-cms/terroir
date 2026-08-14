import { DomainException } from "@/exceptions/models";

/**
 * Domain-layer exception thrown when an entity blueprint refers back to
 * itself through a chain of nested entities, so the aggregate can never
 * finish building.
 *
 * @remarks
 * Detection is where the handling ends: there is no cycle resolution to fall
 * back on. Break the cycle in the model — usually by referencing the nested
 * entity by id instead of embedding it.
 *
 * @example
 * ```ts
 * import { CyclicEntityDefinitionException } from "@roastery/terroir/exceptions/domain";
 *
 * throw new CyclicEntityDefinitionException("post");
 * // → message: "The blueprint of post references itself, directly or indirectly."
 * ```
 *
 * @see {@link DomainException}
 * @see {@link InvalidEntityDefinitionException}
 */
export class CyclicEntityDefinitionException extends DomainException {
	/** Human-readable label for the exception class. */
	public readonly name = "Cyclic Entity Definition";

	/**
	 * @param source - Identifier of the entity whose blueprint contains
	 *   the cycle.
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `The blueprint of ${source} references itself, directly or indirectly.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
