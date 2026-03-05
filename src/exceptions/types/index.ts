import type { CoreExceptionType } from "@/exceptions/core";
import type * as InternalErrors from "@/exceptions/index";

import type { DomainExceptions } from "./domain-exceptions";
import type { ApplicationExceptions } from "./application-exceptions";
import type { InfraExceptions } from "./infra-exceptions";

export type CaffeineExceptionKeysByLayer = {
	internal: keyof typeof InternalErrors;
	domain: DomainExceptions;
	application: ApplicationExceptions;
	infra: InfraExceptions;
};

export type CaffeineExceptionKeys<T extends CoreExceptionType> =
	CaffeineExceptionKeysByLayer[T];

export type CaffeineExceptionRecords<T> = {
	[Key in keyof CaffeineExceptionKeysByLayer]: Record<
		CaffeineExceptionKeysByLayer[Key],
		T
	>;
};
