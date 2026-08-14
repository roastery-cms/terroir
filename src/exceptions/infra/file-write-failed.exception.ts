import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when a write to the filesystem
 * cannot complete — no space left, permission denied, or the descriptor
 * closed underneath the writer.
 *
 * @example
 * ```ts
 * import { FileWriteFailedException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new FileWriteFailedException("/var/log/roastery.log", "file-transport");
 * // → message: "Writing to '/var/log/roastery.log' failed in file-transport."
 * ```
 *
 * @see {@link InfraException}
 * @see {@link StorageUnavailableException}
 */
export class FileWriteFailedException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "File Write Failed Exception";

	/**
	 * @param path - Path being written to (interpolated into the default
	 *   message).
	 * @param source - Identifier of the component performing the write.
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly path: string,
		public readonly source: string,
		public readonly message: string = `Writing to '${path}' failed in ${source}.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
