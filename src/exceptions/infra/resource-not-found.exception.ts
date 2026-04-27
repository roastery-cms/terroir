import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when a low-level fetch (database
 * row, cache key, file, third-party object) returns nothing.
 *
 * @remarks
 * A second `ResourceNotFoundException` exists in the **application layer**
 * (`@/exceptions/application`). They are intentionally separate:
 *
 * - This infra-layer version describes a *raw* lookup miss inside an
 *   adapter (e.g. a repository). Adapters typically translate it into the
 *   application-layer version (or absorb it and return `null`) before it
 *   reaches the use-case.
 * - The application-layer version describes a *business-visible* miss.
 *
 * Because the two classes live in different export paths there is no name
 * collision in TypeScript.
 *
 * @example
 * ```ts
 * import { ResourceNotFoundException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new ResourceNotFoundException("user-repository");
 * // → message: "The resource was not found."
 * ```
 *
 * @see {@link InfraException}
 */
export class ResourceNotFoundException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Resource Not Found Exception";

	/**
	 * @param source - Identifier of the adapter/repository that performed the
	 *   missing lookup.
	 * @param message - Optional explanatory message. Defaults to a static
	 *   string about the missing resource.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = "The resource was not found.",
	) {
		super(message);
	}
}
