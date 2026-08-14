import { CoreException, type CoreExceptionType } from "./core";
import { Layer } from "@/symbols";

/**
 * Internal-layer exception used as a last-resort wrapper when the framework
 * cannot classify an error any further (for example, the value caught in a
 * `catch (error: unknown)` block was not even an instance of {@link Error}).
 *
 * @example
 * ```ts
 * import { UnknownException } from "@roastery/terroir/exceptions";
 *
 * try {
 *   await runHandler();
 * } catch (error) {
 *   throw error instanceof Error ? error : new UnknownException(String(error));
 * }
 * ```
 *
 * @see {@link CoreException}
 */
export class UnknownException extends CoreException {
	/** Layer discriminator, fixed to `"internal"`. */
	public override readonly [Layer]: CoreExceptionType = "internal";

	/** Human-readable label for the exception class. */
	public readonly name = "Unknown Error";

	/** Source identifier — always `"$internal"` for framework-thrown errors. */
	public override readonly source: string = "$internal";

	/**
	 * @param message - Optional explanatory message. Defaults to a generic
	 *   "unknown error" string.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly message: string = "An unknown error has occurred.",
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
