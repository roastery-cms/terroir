import { ExceptionLayer } from "@/exceptions/symbols";
import type { CoreExceptionType } from "./types/core-exception-type";

export abstract class CoreException extends Error {
	public abstract readonly [ExceptionLayer]: CoreExceptionType;
	public abstract override readonly name: string;
	public abstract override readonly message: string;
	public abstract readonly source: string;
}
