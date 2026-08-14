import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when a request is made without a valid
 * authentication context, or with credentials that do not grant access to
 * the requested operation.
 *
 * Translates naturally to an HTTP `401 Unauthorized` response.
 *
 * @example
 * ```ts
 * import { UnauthorizedException } from "@roastery/terroir/exceptions/application";
 *
 * throw new UnauthorizedException("admin-panel");
 * // → message: "Unauthorized access to the admin-panel application."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link ForbiddenException}
 */
export class UnauthorizedException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Unauthorized";

	/** HTTP status this exception maps to. */
	public readonly code = 401;

	/**
	 * @param source - Identifier of the application/use-case that rejected the
	 *   caller.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Unauthorized access to the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
