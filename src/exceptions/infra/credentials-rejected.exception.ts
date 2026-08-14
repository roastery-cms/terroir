import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when an infrastructure dependency
 * refuses the credentials the system presented — a wrong password, an
 * expired key, or a token the backend no longer honours.
 *
 * @remarks
 * Reachability and authorisation are different diagnoses. Reporting rejected
 * credentials as unavailability sends operators chasing a network problem
 * that does not exist. Note this is about *the system's own* credentials,
 * not the end user's — for that, use `UnauthorizedException` from the
 * application layer.
 *
 * @example
 * ```ts
 * import { CredentialsRejectedException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new CredentialsRejectedException("redis-primary");
 * // → message: "The credentials presented to redis-primary were rejected."
 * ```
 *
 * @see {@link InfraException}
 * @see {@link CacheUnavailableException}
 * @see {@link DatabaseUnavailableException}
 */
export class CredentialsRejectedException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Credentials Rejected Exception";

	/**
	 * @param source - Identifier of the dependency that rejected the
	 *   credentials (e.g. `"redis-primary"`).
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `The credentials presented to ${source} were rejected.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
