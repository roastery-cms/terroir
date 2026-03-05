import type { CoreExceptionType } from "@/exceptions/core";
import type * as InternalErrors from "@/exceptions/index";

import type { DomainExceptions } from "./domain-exceptions";
import type { ApplicationExceptions } from "./application-exceptions";
import type { InfraExceptions } from "./infra-exceptions";

export type RoasteryExceptionKeysByLayer = {
	internal: keyof typeof InternalErrors;
	domain: DomainExceptions;
	application: ApplicationExceptions;
	infra: InfraExceptions;
};

export type RoasteryExceptionKeys<T extends CoreExceptionType> =
	RoasteryExceptionKeysByLayer[T];

export type RoasteryExceptionRecords<T> = {
	[Key in keyof RoasteryExceptionKeysByLayer]: Record<
		RoasteryExceptionKeysByLayer[Key],
		T
	>;
};
