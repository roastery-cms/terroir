import { InfraException } from "@/exceptions/models";

export class ResourceNotFoundException extends InfraException {
    public name: string = "Resource Not Found Exception";

    constructor(
        public source: string,
        public message: string = "The resource was not found.",
    ) {
        super(message);
    }
}
