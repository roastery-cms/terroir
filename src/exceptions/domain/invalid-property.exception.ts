import { DomainException } from "@/exceptions/models";

export class InvalidPropertyException extends DomainException {
	public readonly name = "Invalid Property";

	constructor(
		public readonly property: string,
		public readonly source: string,
		public readonly message: string = `The property '${property}' in ${source} is invalid.`,
	) {
		super(message);
	}
}
