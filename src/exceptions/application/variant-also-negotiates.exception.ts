import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when content negotiation for the
 * resource ends up in a circular reference and cannot settle on a
 * representation.
 *
 * Translates naturally to an HTTP `506 Variant Also Negotiates` response.
 *
 * @example
 * ```ts
 * import { VariantAlsoNegotiatesException } from "@roastery/terroir/exceptions/application";
 *
 * throw new VariantAlsoNegotiatesException("reports-service");
 * // → message: "Variant also negotiates in the reports-service application."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link NotAcceptableException}
 */
export class VariantAlsoNegotiatesException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Variant Also Negotiates";

	/** HTTP status this exception maps to. */
	public readonly code = 506;

	/**
	 * @param source - Identifier of the application/use-case where the
	 *   negotiation looped.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Variant also negotiates in the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
