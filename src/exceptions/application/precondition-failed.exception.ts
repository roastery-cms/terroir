import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when a conditional pre-condition
 * supplied by the caller (an expected revision, version or timestamp) does
 * not hold for the current state of the resource.
 *
 * Translates naturally to an HTTP `412 Precondition Failed` response.
 *
 * @example
 * ```ts
 * import { PreconditionFailedException } from "@roastery/terroir/exceptions/application";
 *
 * throw new PreconditionFailedException("documents");
 * // → message: "Precondition failed for the documents application."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link PreconditionRequiredException}
 */
export class PreconditionFailedException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Precondition Failed";

	/** HTTP status this exception maps to. */
	public readonly code = 412;

	/**
	 * @param source - Identifier of the application/use-case that
	 *   evaluated the pre-condition.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Precondition failed for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
