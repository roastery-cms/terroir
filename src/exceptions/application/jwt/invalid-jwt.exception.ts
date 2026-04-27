import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when a JWT presented to the application
 * is malformed, expired, has an invalid signature, or otherwise fails
 * verification.
 *
 * Translates naturally to an HTTP `401 Unauthorized` response.
 *
 * @example
 * ```ts
 * import { InvalidJWTException } from "@roastery/terroir/exceptions/application";
 *
 * throw new InvalidJWTException("auth-service");
 * // → message: "Invalid JWT for the auth-service application."
 * ```
 *
 * @see {@link UnauthorizedException}
 * @see {@link UnableToSignPayloadException}
 */
export class InvalidJWTException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Invalid JWT";

	/**
	 * @param source - Identifier of the application/use-case that received the
	 *   invalid token.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Invalid JWT for the ${source} application.`,
	) {
		super(message);
	}
}
