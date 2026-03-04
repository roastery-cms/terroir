import { InfraException } from "@/exceptions/models";

export class InvalidEnvironmentException extends InfraException {
	public name: string = "Invalid Environment Exception";

	constructor(
		public source: string,
		public message: string = "The required environment variables are invalid or missing.",
	) {
		super(message);
	}
}
