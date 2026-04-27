import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when an operation is forbidden by
 * the underlying infrastructure — for example, an attempt to write to a
 * read-only replica, or a query disallowed by the connection's role.
 *
 * Distinct from {@link UnauthorizedException}, which describes user-level
 * authentication/authorization failures.
 *
 * @example
 * ```ts
 * import { OperationNotAllowedException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new OperationNotAllowedException("postgres-replica");
 * // → message: "The operation is not allowed."
 * ```
 *
 * @see {@link InfraException}
 */
export class OperationNotAllowedException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Operation Not Allowed Exception";

	/**
	 * @param source - Identifier of the infrastructure component that
	 *   rejected the operation.
	 * @param message - Optional explanatory message. Defaults to a static
	 *   string indicating the operation is not allowed.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = "The operation is not allowed.",
	) {
		super(message);
	}
}
