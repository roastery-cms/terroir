import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the application detects an
 * infinite loop while processing the request and aborts instead of spinning
 * forever.
 *
 * Translates naturally to an HTTP `508 Loop Detected` response.
 *
 * @example
 * ```ts
 * import { LoopDetectedException } from "@roastery/terroir/exceptions/application";
 *
 * throw new LoopDetectedException("sync-service");
 * // → message: "Infinite loop detected in the sync-service application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class LoopDetectedException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Loop Detected";

	/** HTTP status this exception maps to. */
	public readonly code = 508;

	/**
	 * @param source - Identifier of the application/use-case where the
	 *   loop was detected.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Infinite loop detected in the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
