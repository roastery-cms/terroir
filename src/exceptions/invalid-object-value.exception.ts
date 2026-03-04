import { CoreException, type CoreExceptionType } from "./core";
import { ExceptionLayer } from "./symbols";

export class InvalidObjectValueException extends CoreException {
	public override readonly [ExceptionLayer]: CoreExceptionType = "internal";
	public readonly name = "Invalid Object Value";
	public override source: string = "$internal";

	constructor(
		public objectValueName: string,
		public message: string = `Invalid value provided for the ${objectValueName} object value.`,
	) {
		super(message);
	}
}
