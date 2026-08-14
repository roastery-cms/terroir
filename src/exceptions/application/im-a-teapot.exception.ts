import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when an operation is requested from a
 * component that is constitutionally incapable of performing it (RFC 2324).
 *
 * Translates naturally to an HTTP `418 I'm a Teapot` response.
 *
 * @remarks
 * Reserved by the IANA registry and rarely appropriate in production code —
 * it exists here so the catalogue covers every HTTP error status.
 *
 * @example
 * ```ts
 * import { ImATeapotException } from "@roastery/terroir/exceptions/application";
 *
 * throw new ImATeapotException("brew-service");
 * // → message: "The brew-service application refuses to brew coffee with a teapot."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class ImATeapotException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "I'm a Teapot";

	/** HTTP status this exception maps to. */
	public readonly code = 418;

	/**
	 * @param source - Identifier of the application/use-case that declined
	 *   to brew.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `The ${source} application refuses to brew coffee with a teapot.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
