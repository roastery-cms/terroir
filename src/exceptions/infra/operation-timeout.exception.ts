import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when an infrastructure call exceeds
 * its time budget — a connection that never opens, a query that never
 * returns, a worker that never answers.
 *
 * @remarks
 * Worth separating from plain unavailability: a timeout is usually retryable
 * and often means the dependency is alive but saturated, which calls for
 * backoff rather than failover.
 *
 * @example
 * ```ts
 * import { OperationTimeoutException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new OperationTimeoutException("redis-primary");
 * // → message: "The redis-primary operation did not complete within the allotted time."
 * ```
 *
 * @see {@link InfraException}
 * @see {@link DatabaseUnavailableException}
 * @see {@link CacheUnavailableException}
 */
export class OperationTimeoutException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Operation Timeout Exception";

	/**
	 * @param source - Identifier of the component whose operation timed
	 *   out (e.g. `"redis-primary"`, `"post-repository"`).
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `The ${source} operation did not complete within the allotted time.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
