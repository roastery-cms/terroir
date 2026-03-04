import { DomainException } from "@/exceptions/models";

export class InvalidDomainDataException extends DomainException {
	public readonly name = "Invalid Domain Data";

	constructor(
		public source: string,
		public message: string = `Invalid data provided for the ${source} domain.`,
	) {
		super(message);
	}
}
