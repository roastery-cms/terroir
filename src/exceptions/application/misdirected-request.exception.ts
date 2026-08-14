import { ApplicationException } from "@/exceptions/models";

/**
 * Application-layer exception thrown when a request reaches an application
 * instance that is not able to produce a response for it (wrong tenant,
 * wrong shard, wrong host).
 *
 * Translates naturally to an HTTP `421 Misdirected Request` response.
 *
 * @example
 * ```ts
 * import { MisdirectedRequestException } from "@roastery/terroir/exceptions/application";
 *
 * throw new MisdirectedRequestException("tenant-router");
 * // → message: "Misdirected request for the tenant-router application."
 * ```
 *
 * @see {@link ApplicationException}
 */
export class MisdirectedRequestException extends ApplicationException {
	/** Human-readable label for the exception class. */
	public readonly name = "Misdirected Request";

	/** HTTP status this exception maps to. */
	public readonly code = 421;

	/**
	 * @param source - Identifier of the application/use-case that received
	 *   the misdirected request.
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `Misdirected request for the ${source} application.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
