import type { CoreExceptionType } from "@/exceptions/core";
import type * as InternalErrors from "@/exceptions/index";

import type { CaffeineDomainExceptions } from "./caffeine-domain-exceptions";
import type { CaffeineApplicationExceptions } from "./caffeine-application-exceptions";
import type { CaffeineInfraExceptions } from "./caffeine-infra-exceptions";

export type CaffeineExceptionKeysByLayer = {
    internal: keyof typeof InternalErrors;
    domain: CaffeineDomainExceptions;
    application: CaffeineApplicationExceptions;
    infra: CaffeineInfraExceptions;
};

export type CaffeineExceptionKeys<T extends CoreExceptionType> =
    CaffeineExceptionKeysByLayer[T];

export type CaffeineExceptionRecords<T> = {
    [Key in keyof CaffeineExceptionKeysByLayer]: Record<
        CaffeineExceptionKeysByLayer[Key],
        T
    >;
};
