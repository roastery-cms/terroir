import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when a read targets a path that does
 * not exist, on the local filesystem or in object storage.
 *
 * @example
 * ```ts
 * import { FileNotFoundException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new FileNotFoundException("/var/log/roastery.log", "file-transport");
 * // → message: "The file '/var/log/roastery.log' was not found by file-transport."
 * ```
 *
 * @see {@link InfraException}
 * @see {@link StorageUnavailableException}
 * @see {@link ResourceNotFoundException}
 */
export class FileNotFoundException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "File Not Found Exception";

	/**
	 * @param path - Path or object key that could not be resolved
	 *   (interpolated into the default message).
	 * @param source - Identifier of the component performing the read
	 *   (e.g. `"file-transport"`).
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly path: string,
		public readonly source: string,
		public readonly message: string = `The file '${path}' was not found by ${source}.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
