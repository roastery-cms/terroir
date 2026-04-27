import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when the cache layer cannot service a
 * request — typically because the cache server is down, unreachable, or
 * returning protocol errors.
 *
 * Translates naturally to an HTTP `503 Service Unavailable` response (or to
 * a graceful fallback that bypasses the cache).
 *
 * @example
 * ```ts
 * import { CacheUnavailableException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new CacheUnavailableException("redis-primary");
 * // → message: "The cache is currently unavailable."
 * ```
 *
 * @see {@link InfraException}
 * @see {@link UnexpectedCacheValueException}
 */
export class CacheUnavailableException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Cache Unavailable Exception";

	/**
	 * @param source - Identifier of the cache backend or component that
	 *   failed.
	 * @param message - Optional explanatory message. Defaults to a static
	 *   string indicating the cache is unavailable.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = "The cache is currently unavailable.",
	) {
		super(message);
	}
}
