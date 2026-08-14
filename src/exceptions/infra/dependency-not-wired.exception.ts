import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when a component reaches for a
 * dependency that was never injected — the object graph was assembled
 * incompletely, or the plugin that provides it ran out of order.
 *
 * @remarks
 * Distinct from {@link MissingPluginDependencyException}, which reports a
 * *declared* plugin dependency that is absent. This one is about wiring: the
 * dependency exists, nobody handed it over.
 *
 * @example
 * ```ts
 * import { DependencyNotWiredException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new DependencyNotWiredException("post-repository");
 * // → message: "The post-repository dependency was not provided during composition."
 * ```
 *
 * @see {@link InfraException}
 * @see {@link MissingPluginDependencyException}
 */
export class DependencyNotWiredException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Dependency Not Wired Exception";

	/**
	 * @param source - Identifier of the dependency that should have been
	 *   wired (e.g. `"prisma-client"`, `"post-repository"`).
	 * @param message - Optional explanatory message. Defaults to a
	 *   templated string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `The ${source} dependency was not provided during composition.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
