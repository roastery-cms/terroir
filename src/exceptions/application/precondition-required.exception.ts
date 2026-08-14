import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the caller issued an unconditional
 * request where the use-case requires a conditional one, to avoid a lost
 * update.
 *
 * Translates naturally to an HTTP `428 Precondition Required` response.
 *
 * @example
 * ```ts
 * import { PreconditionRequiredException } from "@roastery/terroir/exceptions/application";
 *
 * throw new PreconditionRequiredException("documents");
 * // → message: "Precondition required for the documents application."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link PreconditionFailedException}
 */
export class PreconditionRequiredException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Precondition Required";

	/** HTTP status this exception maps to. */
	public readonly code = 428;

	/**
	 * @param source - Identifier of the application/use-case that requires
	 *   the pre-condition.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Precondition required for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
