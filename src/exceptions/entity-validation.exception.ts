import { CoreException, type CoreExceptionType } from "./core";
import { ExceptionLayer } from "./symbols";

export class InvalidEntityData extends CoreException {
	public override readonly [ExceptionLayer]: CoreExceptionType = "internal";
	public name: string = "Invalid Entity Data";
	public override source: string = "$internal";

	constructor(public message: string = "The entity validation failed.") {
		super(message);
	}
}
