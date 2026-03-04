import { ApplicationException } from "@/exceptions/models";

export class UnauthorizedException extends ApplicationException {
	public readonly name = "Unauthorized";

	constructor(
		public source: string,
		public message: string = `Unauthorized access to the ${source} application.`,
	) {
		super(message);
	}
}
