import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when JWT signing fails — typically
 * because of a missing secret/private key, an unsupported algorithm, or a
 * payload that the underlying library refuses to encode.
 *
 * @example
 * ```ts
 * import { UnableToSignPayloadException } from "@roastery/terroir/exceptions/application";
 *
 * throw new UnableToSignPayloadException("auth-service");
 * // → message: "Unable to sign payload for the auth-service application."
 * ```
 *
 * @see {@link InvalidJWTException}
 */
export class UnableToSignPayloadException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Unable to Sign Payload";

	/**
	 * @param source - Identifier of the application/use-case that attempted to
	 *   sign the payload.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Unable to sign payload for the ${source} application.`,
	) {
		super(message);
	}
}
