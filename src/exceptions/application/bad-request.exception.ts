import { ApplicationException } from "@/exceptions/models";

export class BadRequestException extends ApplicationException {
	public readonly name = "Bad Request";

	constructor(
		public source: string,
		public message: string = `Bad request for the ${source} application.`,
	) {
		super(message);
	}
}
