import { ExceptionLayer } from "@/exceptions/symbols";
import { CoreException, type CoreExceptionType } from "../core";

export abstract class DomainException extends CoreException {
	public override readonly [ExceptionLayer]: CoreExceptionType = "domain";
}
