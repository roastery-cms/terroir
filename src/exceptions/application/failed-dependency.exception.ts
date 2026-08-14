import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the operation cannot be performed
 * because another request it depended on has already failed.
 *
 * Translates naturally to an HTTP `424 Failed Dependency` response.
 *
 * @example
 * ```ts
 * import { FailedDependencyException } from "@roastery/terroir/exceptions/application";
 *
 * throw new FailedDependencyException("checkout-service");
 * // → message: "A dependent request failed for the checkout-service application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class FailedDependencyException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Failed Dependency";

	/** HTTP status this exception maps to. */
	public readonly code = 424;

	/**
	 * @param source - Identifier of the application/use-case that
	 *   orchestrated the failed dependency.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `A dependent request failed for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
