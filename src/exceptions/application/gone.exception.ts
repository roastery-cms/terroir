import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the requested resource existed in
 * the past and has been permanently removed, with no forwarding location.
 *
 * Translates naturally to an HTTP `410 Gone` response.
 *
 * @remarks
 * Prefer {@link ResourceNotFoundException} when the absence is not known to
 * be permanent — `Gone` is a deliberate statement that the resource will not
 * come back.
 *
 * @example
 * ```ts
 * import { GoneException } from "@roastery/terroir/exceptions/application";
 *
 * throw new GoneException("articles");
 * // → message: "Resource is no longer available in the articles application."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link ResourceNotFoundException}
 */
export class GoneException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Gone";

	/** HTTP status this exception maps to. */
	public readonly code = 410;

	/**
	 * @param source - Identifier of the application/use-case that owned
	 *   the removed resource.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Resource is no longer available in the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
