import { CoreException, type CoreExceptionType } from "./core";
import { ExceptionLayer } from "./symbols";

/**
 * Internal-layer exception thrown by the framework itself when an entity
 * validation step fails inside the `terroir` runtime.
 *
 * Unlike layer-specific exceptions, this class skips the abstract layer
 * models and extends {@link CoreException} directly, marking itself as
 * `[ExceptionLayer] === "internal"` and pinning `source` to `"$internal"`.
 *
 * @remarks
 * Renamed from `InvalidEntityData` to follow the package-wide
 * `*Exception` suffix convention. Application code that catches this class
 * should import the new name.
 *
 * @example
 * ```ts
 * import { InvalidEntityDataException } from "@roastery/terroir/exceptions";
 *
 * throw new InvalidEntityDataException();
 * // → message: "The entity validation failed."
 *
 * throw new InvalidEntityDataException("Address aggregate failed schema check.");
 * ```
 *
 * @see {@link CoreException}
 * @see {@link InvalidObjectValueException}
 */
export class InvalidEntityDataException extends CoreException {
	/** Layer discriminator, fixed to `"internal"`. */
	public override readonly [ExceptionLayer]: CoreExceptionType = "internal";

	/** Human-readable label for the exception class. */
	public readonly name = "Invalid Entity Data";

	/** Source identifier — always `"$internal"` for framework-thrown errors. */
	public override readonly source: string = "$internal";

	/**
	 * @param message - Optional explanatory message. Defaults to a generic
	 *   description of the entity validation failure.
	 */
	constructor(
		public readonly message: string = "The entity validation failed.",
	) {
		super(message);
	}
}
