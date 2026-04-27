import { ExceptionLayer } from "@/exceptions/symbols";
import { CoreException, type CoreExceptionType } from "../core";

/**
 * Abstract base for every exception thrown from the **infrastructure layer**
 * (databases, caches, file systems, third-party services, plugins).
 *
 * The class fixes `[ExceptionLayer]` to `"infra"`, leaving subclasses
 * responsible only for `name`, `message`, `source`, and any extra fields
 * needed to explain the infrastructure-level failure.
 *
 * @remarks
 * Infra exceptions typically translate into HTTP `5xx` responses (the
 * service depends on something that became unavailable), but the class
 * itself is transport-agnostic.
 *
 * @example
 * ```ts
 * import { InfraException } from "@roastery/terroir/exceptions/models";
 *
 * export class S3UploadFailedException extends InfraException {
 *   public readonly name = "S3 Upload Failed Exception";
 *
 *   constructor(
 *     public readonly source: string,
 *     public readonly message = `Failed to upload object to S3 from ${source}.`,
 *   ) {
 *     super(message);
 *   }
 * }
 * ```
 *
 * @see {@link CoreException}
 * @see {@link ApplicationException}
 * @see {@link DomainException}
 */
export abstract class InfraException extends CoreException {
	/**
	 * Layer discriminator pinned to `"infra"`. Sealed by this abstract class
	 * so concrete subclasses do not need to assign it themselves.
	 */
	public override readonly [ExceptionLayer]: CoreExceptionType = "infra";
}
