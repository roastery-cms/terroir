import { CoreException, type CoreExceptionType } from "./core";
import { ExceptionLayer } from "./symbols";

/**
 * Internal-layer exception thrown when a value object is constructed with a
 * value that fails its self-validation routine.
 *
 * Carries the name of the value object that rejected the value so callers
 * can map the failure to a specific input.
 *
 * @example
 * ```ts
 * import { InvalidObjectValueException } from "@roastery/terroir/exceptions";
 *
 * throw new InvalidObjectValueException("Email");
 * // → message: "Invalid value provided for the Email object value."
 * ```
 *
 * @see {@link CoreException}
 * @see {@link InvalidEntityDataException}
 */
export class InvalidObjectValueException extends CoreException {
	/** Layer discriminator, fixed to `"internal"`. */
	public override readonly [ExceptionLayer]: CoreExceptionType = "internal";

	/** Human-readable label for the exception class. */
	public readonly name = "Invalid Object Value";

	/** Source identifier — always `"$internal"` for framework-thrown errors. */
	public override readonly source: string = "$internal";

	/**
	 * @param objectValueName - Name of the value object that rejected the
	 *   value (interpolated into the default message).
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link objectValueName}.
	 */
	constructor(
		public readonly objectValueName: string,
		public readonly message: string = `Invalid value provided for the ${objectValueName} object value.`,
	) {
		super(message);
	}
}
