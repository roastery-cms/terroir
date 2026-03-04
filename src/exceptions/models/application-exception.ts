import { ExceptionLayer } from "@/exceptions/symbols";
import { CoreException, type CoreExceptionType } from "../core";

export abstract class ApplicationException extends CoreException {
    public override readonly [ExceptionLayer]: CoreExceptionType =
        "application";
}
