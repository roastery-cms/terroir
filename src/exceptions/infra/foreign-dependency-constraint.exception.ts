import { InfraException } from "@/exceptions/models";

export class ForeignDependencyConstraintException extends InfraException {
	public name: string = "Foreign Dependency Constraint Exception";

	constructor(
		public source: string,
		public message: string = `It was not possible to remove the ${source} resource due to its usefulness in other domains.`,
	) {
		super(message);
	}
}
