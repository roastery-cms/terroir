import { ApplicationException } from "@/exceptions/models";

export class UnableToSignPayloadException extends ApplicationException {
	public readonly name = "Unable to Sign Payload";

	constructor(
		public source: string,
		public message: string = `Unable to sign payload for the ${source} application.`,
	) {
		super(message);
	}
}
