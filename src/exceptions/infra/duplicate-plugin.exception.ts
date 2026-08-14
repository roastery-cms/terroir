import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when the same plugin is registered
 * twice in one application, which either means a redundant `.use()` or two
 * capsules claiming the same name.
 *
 * @remarks
 * Silently keeping the first registration hides the collision: two capsules
 * answering to one name will fight over the same decorator slot, and the
 * loser fails much later and far from the cause.
 *
 * @example
 * ```ts
 * import { DuplicatePluginException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new DuplicatePluginException("cache");
 * // → message: "The "cache" plugin was registered more than once."
 * ```
 *
 * @see {@link InfraException}
 * @see {@link MissingPluginDependencyException}
 */
export class DuplicatePluginException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Duplicate Plugin Exception";

	/**
	 * @param source - Name of the plugin that was registered more than
	 *   once.
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `The "${source}" plugin was registered more than once.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
