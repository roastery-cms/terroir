import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown at boot (or whenever environment is
 * re-read) when one or more required environment variables are missing or
 * have unparseable values.
 *
 * @remarks
 * Throwing this exception during bootstrap is preferable to lazily failing
 * later inside a request handler — it surfaces configuration mistakes
 * before the process starts accepting traffic.
 *
 * @example
 * ```ts
 * import { InvalidEnvironmentException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new InvalidEnvironmentException("config-loader");
 * // → message: "The required environment variables are invalid or missing."
 * ```
 *
 * @see {@link InfraException}
 */
export class InvalidEnvironmentException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Invalid Environment Exception";

	/**
	 * @param source - Identifier of the component that detected the invalid
	 *   environment (e.g. `"config-loader"`).
	 * @param message - Optional explanatory message. Defaults to a static
	 *   string about missing/invalid env vars.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = "The required environment variables are invalid or missing.",
	) {
		super(message);
	}
}
