import { InfraException } from "@/exceptions/models";

export class MissingPluginDependencyException extends InfraException {
	public name: string = "Missing Plugin Dependency Exception";

	constructor(
		public source: string,
		public message: string = `The dependencies of the "${source}" plugin are not satisfied.`,
	) {
		super(message);
	}
}
