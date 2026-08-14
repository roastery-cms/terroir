import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the operation cannot be completed
 * because there is not enough storage left to hold the resulting
 * representation.
 *
 * Translates naturally to an HTTP `507 Insufficient Storage` response.
 *
 * @example
 * ```ts
 * import { InsufficientStorageException } from "@roastery/terroir/exceptions/application";
 *
 * throw new InsufficientStorageException("uploads-service");
 * // → message: "Insufficient storage for the uploads-service application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class InsufficientStorageException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Insufficient Storage";

	/** HTTP status this exception maps to. */
	public readonly code = 507;

	/**
	 * @param source - Identifier of the application/use-case that ran out
	 *   of storage.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Insufficient storage for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
