import { ApplicationException } from "@/exceptions/models";

export class InvalidOperationException extends ApplicationException {
	public readonly name = "Invalid Operation";

	constructor(
		public source: string,
		public message: string = `Invalid operation for the ${source} application.`,
	) {
		super(message);
	}
}
