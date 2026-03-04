import { ExceptionLayer } from "@/exceptions/symbols";
import { CoreException, type CoreExceptionType } from "../core";

export abstract class InfraException extends CoreException {
    public override readonly [ExceptionLayer]: CoreExceptionType = "infra";
}
