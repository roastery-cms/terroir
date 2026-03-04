import { ApplicationException } from "@/exceptions/models";

export class InvalidJWTException extends ApplicationException {
	public readonly name = "Invalid JWT";

	constructor(
		public source: string,
		public message: string = `Invalid JWT for the ${source} application.`,
	) {
		super(message);
	}
}
