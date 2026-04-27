import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when the database cannot service a
 * request — typically because the server is down, unreachable, refusing
 * connections, or has exhausted its connection pool.
 *
 * Translates naturally to an HTTP `503 Service Unavailable` response.
 *
 * @example
 * ```ts
 * import { DatabaseUnavailableException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new DatabaseUnavailableException("postgres-primary");
 * // → message: "The database is currently unavailable."
 * ```
 *
 * @see {@link InfraException}
 * @see {@link CacheUnavailableException}
 */
export class DatabaseUnavailableException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Database Unavailable Exception";

	/**
	 * @param source - Identifier of the database backend or component that
	 *   failed.
	 * @param message - Optional explanatory message. Defaults to a static
	 *   string indicating the database is unavailable.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = "The database is currently unavailable.",
	) {
		super(message);
	}
}
