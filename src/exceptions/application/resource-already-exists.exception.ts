import { ApplicationException } from "@/exceptions/models";

export class ResourceAlreadyExistsException extends ApplicationException {
    public readonly name = "Resource Already Exists";

    constructor(
        public source: string,
        public message: string = `Resource already exists in the ${source} domain.`,
    ) {
        super(message);
    }
}
