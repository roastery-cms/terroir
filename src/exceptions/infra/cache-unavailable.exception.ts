import { InfraException } from "@/exceptions/models";

export class CacheUnavailableException extends InfraException {
    public name: string = "Cache Unavailable Exception";

    constructor(
        public source: string,
        public message: string = "The cache is currently unavailable.",
    ) {
        super(message);
    }
}
