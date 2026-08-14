import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when a conditional write finds the
 * record in a different revision than the one the caller read — someone else
 * committed first.
 *
 * @remarks
 * Do not collapse this into a not-found: the row exists, its version simply
 * moved. Reporting it as "not found" makes the caller delete-and-recreate
 * when the correct move is to re-read and re-apply.
 *
 * @example
 * ```ts
 * import { OptimisticLockException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new OptimisticLockException("post");
 * // → message: "The post record changed since it was read."
 * ```
 *
 * @see {@link InfraException}
 * @see {@link ConflictException}
 * @see {@link WriteConflictException}
 */
export class OptimisticLockException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Optimistic Lock Exception";

	/**
	 * @param source - Identifier of the record or repository whose
	 *   revision moved.
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `The ${source} record changed since it was read.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
