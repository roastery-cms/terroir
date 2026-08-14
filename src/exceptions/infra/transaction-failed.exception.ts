import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when a database transaction cannot
 * be committed and is rolled back — a constraint deferred to commit time, a
 * broken savepoint, or an aborted unit of work.
 *
 * @example
 * ```ts
 * import { TransactionFailedException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new TransactionFailedException("post-repository");
 * // → message: "The transaction in post-repository could not be completed and was rolled back."
 * ```
 *
 * @see {@link InfraException}
 * @see {@link WriteConflictException}
 */
export class TransactionFailedException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Transaction Failed Exception";

	/**
	 * @param source - Identifier of the repository or adapter that owned
	 *   the transaction.
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `The transaction in ${source} could not be completed and was rolled back.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
