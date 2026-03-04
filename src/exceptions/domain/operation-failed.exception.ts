import { DomainException } from "@/exceptions/models";

export class OperationFailedException extends DomainException {
    public readonly name = "Operation Failed";

    constructor(
        public source: string,
        public message: string = `Operation failed in the ${source} domain.`,
    ) {
        super(message);
    }
}
