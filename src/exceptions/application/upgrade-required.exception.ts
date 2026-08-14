import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when the caller must switch to a
 * different protocol before the use-case is willing to serve the operation.
 *
 * Translates naturally to an HTTP `426 Upgrade Required` response.
 *
 * @example
 * ```ts
 * import { UpgradeRequiredException } from "@roastery/terroir/exceptions/application";
 *
 * throw new UpgradeRequiredException("realtime-gateway");
 * // → message: "Protocol upgrade required for the realtime-gateway application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class UpgradeRequiredException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Upgrade Required";

	/** HTTP status this exception maps to. */
	public readonly code = 426;

	/**
	 * @param source - Identifier of the application/use-case that demands
	 *   the upgrade.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Protocol upgrade required for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
