import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when the database reports a conflict
 * — typically a unique-constraint violation or an optimistic-locking version
 * mismatch.
 *
 * @remarks
 * Distinct from {@link ResourceAlreadyExistsException} from the application
 * layer: this class describes the **database driver's** error, while the
 * application-layer one describes the **use-case-level** decision to reject
 * a duplicate. Adapters typically translate this exception into the
 * application-level one before bubbling it up.
 *
 * @example
 * ```ts
 * import { ConflictException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new ConflictException("postgres");
 * // → message: "A conflict occurred in the database."
 * ```
 *
 * @see {@link InfraException}
 */
export class ConflictException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Conflict Exception";

	/**
	 * @param source - Identifier of the datastore or repository that detected
	 *   the conflict.
	 * @param message - Optional explanatory message. Defaults to a static
	 *   string indicating a database conflict.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = "A conflict occurred in the database.",
	) {
		super(message);
	}
}
