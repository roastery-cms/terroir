import { InfraException } from "@/exceptions/models";

/**
 * Infrastructure-layer exception thrown when a plugin is loaded but one of
 * its declared dependencies (another plugin, a service, an environment
 * value) is not satisfied.
 *
 * @example
 * ```ts
 * import { MissingPluginDependencyException } from "@roastery/terroir/exceptions/infra";
 *
 * throw new MissingPluginDependencyException("mailer");
 * // → message: "The dependencies of the \"mailer\" plugin are not satisfied."
 * ```
 *
 * @see {@link InfraException}
 */
export class MissingPluginDependencyException extends InfraException {
	/** Human-readable label for the exception class. */
	public readonly name = "Missing Plugin Dependency Exception";

	/**
	 * @param source - Identifier of the plugin whose dependencies are missing
	 *   (interpolated into the default message).
	 * @param message - Optional explanatory message. Defaults to a templated
	 *   string that references {@link source}.
	 * @param options - Native `ErrorOptions`; pass `{ cause }` to keep the
	 *   error that triggered this one.
	 */
	constructor(
		public readonly source: string,
		public readonly message: string = `The dependencies of the "${source}" plugin are not satisfied.`,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
