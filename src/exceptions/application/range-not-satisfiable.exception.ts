import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the caller asks for a portion of a
 * resource that lies outside of its actual bounds.
 *
 * Translates naturally to an HTTP `416 Range Not Satisfiable` response.
 *
 * @example
 * ```ts
 * import { RangeNotSatisfiableException } from "@roastery/terroir/exceptions/application";
 *
 * throw new RangeNotSatisfiableException("media-service");
 * // → message: "Requested range not satisfiable for the media-service application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class RangeNotSatisfiableException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Range Not Satisfiable";

	/** HTTP status this exception maps to. */
	public readonly code = 416;

	/**
	 * @param source - Identifier of the application/use-case that owns the
	 *   resource.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Requested range not satisfiable for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
