import { InfraException } from "@/exceptions/models";

export class UnexpectedCacheValueException extends InfraException {
    public readonly name = "Unexpected Cache Value Exception";

    constructor(
        public readonly key: string,
        public readonly source: string,
        public readonly message: string = `The value from cache for key '${key}' was unexpected.`,
    ) {
        super(message);
    }
}
