import { DomainException } from "@/exceptions/models";

/**
 * Domain-layer exception thrown when an entity carries part of its identity
 * but not all of it — an `id` without timestamps, or timestamps without an
 * `id`.
 *
 * @remarks
 * Identity is all-or-nothing: a half-built identity usually means a payload
 * was hand-assembled or a projection dropped columns, and letting it through
 * produces records that cannot be correlated later.
 *
 * @example
 * ```ts
 * import { IncompleteIdentityException } from "@roastery/terroir/exceptions/domain";
 *
 * throw new IncompleteIdentityException("post");
 * // → message: "The identity of post is incomplete."
 * ```
 *
 * @see {@link DomainException}
 * @see {@link InvalidDomainDataException}
 */
export class IncompleteIdentityException extends DomainException {
	/** Human-readable label for the exception class. */
	public readonly name = "Incomplete Identity";

	/**
	 * @param source - Identifier of the entity whose identity is
	 *   incomplete.
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `The identity of ${source} is incomplete.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
