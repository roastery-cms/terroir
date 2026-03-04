import { InfraException } from "@/exceptions/models";

export class OperationNotAllowedException extends InfraException {
    public name: string = "Operation Not Allowed Exception";

    constructor(
        public source: string,
        public message: string = "The operation is not allowed.",
    ) {
        super(message);
    }
}
