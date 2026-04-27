import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when a use-case looks up a resource by
 * id (or by any unique key) and the lookup returns nothing.
 *
 * Translates naturally to an HTTP `404 Not Found` response.
 *
 * @remarks
 * A second `ResourceNotFoundException` exists in the **infra layer**
 * (`@/exceptions/infra`). They are intentionally separate:
 *
 * - The application-layer version describes a *use-case* that could not
 *   produce the resource the caller asked for (a business-visible miss).
 * - The infra-layer version describes a low-level fetch (e.g. a row missing
 *   from a repository) that callers higher up may decide to translate into
 *   any number of application errors.
 *
 * Choose the layer that matches who is throwing it. Because the two classes
 * live in different export paths there is no name collision in TypeScript.
 *
 * @example
 * ```ts
 * import { ResourceNotFoundException } from "@roastery/terroir/exceptions/application";
 *
 * throw new ResourceNotFoundException("users");
 * // → message: "Resource not found in the users domain."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link ResourceAlreadyExistsException}
 */
export class ResourceNotFoundException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Resource Not Found";

	/**
	 * @param source - Identifier of the domain/use-case where the lookup
	 *   failed (used in the default message template).
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Resource not found in the ${source} domain.`,
	) {
		super(message);
	}
}
