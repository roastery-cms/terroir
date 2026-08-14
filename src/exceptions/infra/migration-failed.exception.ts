import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when a schema migration cannot be
 * applied — it failed midway, the history is inconsistent, or the target
 * schema drifted from what the migration expects.
 *
 * @remarks
 * Like {@link InvalidEnvironmentException}, this belongs at boot: surfacing
 * it before the process accepts traffic is far cheaper than discovering the
 * drift inside a request.
 *
 * @example
 * ```ts
 * import { MigrationFailedException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new MigrationFailedException("post-schema");
 * // → message: "The database migration for post-schema could not be applied."
 * ```
 *
 * @see {@link InfraException}
 * @see {@link InvalidEnvironmentException}
 * @see {@link DatabaseUnavailableException}
 */
export class MigrationFailedException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Migration Failed Exception";

	/**
	 * @param source - Identifier of the schema or adapter being migrated
	 *   (e.g. `"post-schema"`).
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `The database migration for ${source} could not be applied.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
