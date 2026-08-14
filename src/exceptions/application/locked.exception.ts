import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the target resource is held by
 * another operation and cannot be read or modified until that lock is
 * released.
 *
 * Translates naturally to an HTTP `423 Locked` response.
 *
 * @example
 * ```ts
 * import { LockedException } from "@roastery/terroir/exceptions/application";
 *
 * throw new LockedException("documents");
 * // → message: "Resource is locked in the documents application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class LockedException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Locked";

	/** HTTP status this exception maps to. */
	public readonly code = 423;

	/**
	 * @param source - Identifier of the application/use-case that holds or
	 *   observed the lock.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Resource is locked in the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
