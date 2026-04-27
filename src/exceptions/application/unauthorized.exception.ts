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
 * @see {@link InvalidJWTException}
 */
export class UnauthorizedException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Unauthorized";

	/**
	 * @param source - Identifier of the application/use-case that rejected the
	 *   caller.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Unauthorized access to the ${source} application.`,
	) {
		super(message);
	}
}
