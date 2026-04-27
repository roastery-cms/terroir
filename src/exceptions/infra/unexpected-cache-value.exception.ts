import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when a cache lookup succeeds but the
 * stored value cannot be parsed or fails the expected schema.
 *
 * @remarks
 * Carries the offending cache key so log consumers can purge or investigate
 * the corrupt entry directly.
 *
 * @example
 * ```ts
 * import { UnexpectedCacheValueException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new UnexpectedCacheValueException("user:42:profile", "redis-primary");
 * // → message: "The value from cache for key 'user:42:profile' was unexpected."
 * ```
 *
 * @see {@link InfraException}
 * @see {@link CacheUnavailableException}
 */
export class UnexpectedCacheValueException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Unexpected Cache Value Exception";

	/**
	 * @param key - The cache key whose stored value did not match
	 *   expectations (interpolated into the default message).
	 * @param source - Identifier of the cache backend.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link key}.
	 */
	constructor(
		public readonly key: string,
		public readonly source: string,
		public readonly message: string = `The value from cache for key '${key}' was unexpected.`,
	) {
		super(message);
	}
}
