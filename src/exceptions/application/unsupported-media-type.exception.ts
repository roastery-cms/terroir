import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the payload arrives in a format
 * the use-case does not know how to decode.
 *
 * Translates naturally to an HTTP `415 Unsupported Media Type` response.
 *
 * @example
 * ```ts
 * import { UnsupportedMediaTypeException } from "@roastery/terroir/exceptions/application";
 *
 * throw new UnsupportedMediaTypeException("uploads-service");
 * // → message: "Unsupported media type for the uploads-service application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class UnsupportedMediaTypeException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Unsupported Media Type";

	/** HTTP status this exception maps to. */
	public readonly code = 415;

	/**
	 * @param source - Identifier of the application/use-case that could
	 *   not decode the payload.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Unsupported media type for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
