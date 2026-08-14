import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the resource cannot be served
 * because of a legal demand (takedown notice, censorship order, regional
 * restriction).
 *
 * Translates naturally to an HTTP `451 Unavailable For Legal Reasons` response.
 *
 * @example
 * ```ts
 * import { UnavailableForLegalReasonsException } from "@roastery/terroir/exceptions/application";
 *
 * throw new UnavailableForLegalReasonsException("catalog-service");
 * // → message: "Resource unavailable for legal reasons in the catalog-service application."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link GoneException}
 */
export class UnavailableForLegalReasonsException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Unavailable For Legal Reasons";

	/** HTTP status this exception maps to. */
	public readonly code = 451;

	/**
	 * @param source - Identifier of the application/use-case that withheld
	 *   the resource.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Resource unavailable for legal reasons in the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
