import { CoreException, type CoreExceptionType } from "./core";
import { ExceptionLayer } from "./symbols";

export class UnknownException extends CoreException {
	public override readonly [ExceptionLayer]: CoreExceptionType = "internal";
	public name: string = "Unknown Error";
	public override source: string = "$internal";

	constructor(public message: string = "An unknown error has occurred.") {
		super(message);
	}
}
