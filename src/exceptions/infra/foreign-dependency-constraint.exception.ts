import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when a delete (or other destructive)
 * operation is rejected because the row is still referenced by foreign keys
 * in other tables/domains.
 *
 * Translates naturally to an HTTP `409 Conflict` response.
 *
 * @example
 * ```ts
 * import { ForeignDependencyConstraintException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new ForeignDependencyConstraintException("category");
 * // → message: "It was not possible to remove the category resource due to its usefulness in other domains."
 * ```
 *
 * @see {@link InfraException}
 * @see {@link ConflictException}
 */
export class ForeignDependencyConstraintException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Foreign Dependency Constraint Exception";

	/**
	 * @param source - Identifier of the resource/table whose deletion was
	 *   blocked by foreign-key dependencies (used in the default message
	 *   template).
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `It was not possible to remove the ${source} resource due to its usefulness in other domains.`,
	) {
		super(message);
	}
}
