import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the caller is correctly
 * authenticated but is not allowed to perform the requested operation.
 *
 * Translates naturally to an HTTP `403 Forbidden` response.
 *
 * @remarks
 * Distinct from {@link UnauthorizedException}: the identity is known, it
 * simply lacks the required permission — re-authenticating will not help.
 *
 * @example
 * ```ts
 * import { ForbiddenException } from "@roastery/terroir/exceptions/application";
 *
 * throw new ForbiddenException("admin-panel");
 * // → message: "Forbidden access to the admin-panel application."
 * ```
 *
 * @see {@link ApplicationException}
 * @see {@link UnauthorizedException}
 */
export class ForbiddenException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Forbidden";

	/** HTTP status this exception maps to. */
	public readonly code = 403;

	/**
	 * @param source - Identifier of the application/use-case that denied
	 *   the caller.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Forbidden access to the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
