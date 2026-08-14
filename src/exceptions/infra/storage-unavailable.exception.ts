import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when the object storage backing a
 * bucket cannot service a request — the service is unreachable, rejecting
 * calls, or refusing the operation outright.
 *
 * @example
 * ```ts
 * import { StorageUnavailableException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new StorageUnavailableException("s3-media");
 * // → message: "The s3-media object storage is currently unavailable."
 * ```
 *
 * @see {@link InfraException}
 * @see {@link FileNotFoundException}
 * @see {@link FileWriteFailedException}
 */
export class StorageUnavailableException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Storage Unavailable Exception";

	/**
	 * @param source - Identifier of the storage backend or bucket that
	 *   failed (e.g. `"s3-media"`).
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `The ${source} object storage is currently unavailable.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
