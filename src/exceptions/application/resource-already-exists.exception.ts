import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when a use-case tries to create a
 * resource whose unique identifier (or business key) is already taken.
 *
 * Translates naturally to an HTTP `409 Conflict` response.
 *
 * @example
 * ```ts
 * import { ResourceAlreadyExistsException } from "@roastery/terroir/exceptions/application";
 *
 * throw new ResourceAlreadyExistsException("users");
 * // → message: "Resource already exists in the users domain."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link ResourceNotFoundException}
 */
export class ResourceAlreadyExistsException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Resource Already Exists";

	/**
	 * @param source - Identifier of the domain/use-case that detected the
	 *   conflict (used in the default message template).
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Resource already exists in the ${source} domain.`,
	) {
		super(message);
	}
}
