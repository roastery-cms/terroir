import { ApplicationException } from "@/exceptions/models";

export class ResourceNotFoundException extends ApplicationException {
	public readonly name = "Resource Not Found";

	constructor(
		public source: string,
		public message: string = `Resource not found in the ${source} domain.`,
	) {
		super(message);
	}
}
