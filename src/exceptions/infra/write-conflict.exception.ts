import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when two concurrent transactions
 * collide — a deadlock, or a serialization failure under an isolation level
 * that refuses to interleave them.
 *
 * @remarks
 * This failure is **retryable by definition**: the database aborted one side
 * precisely so the caller could try again. Treat it differently from {@link
 * TransactionFailedException}, which describes a transaction that will fail
 * again if replayed unchanged.
 *
 * @example
 * ```ts
 * import { WriteConflictException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new WriteConflictException("post-repository");
 * // → message: "A concurrent write conflict was detected in post-repository."
 * ```
 *
 * @see {@link InfraException}
 * @see {@link TransactionFailedException}
 * @see {@link OptimisticLockException}
 */
export class WriteConflictException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Write Conflict Exception";

	/**
	 * @param source - Identifier of the repository or adapter where the
	 *   conflict surfaced.
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `A concurrent write conflict was detected in ${source}.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
