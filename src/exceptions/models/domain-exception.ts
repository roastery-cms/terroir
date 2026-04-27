import { ExceptionLayer } from "@/exceptions/symbols";
import { CoreException, type CoreExceptionType } from "../core";

/**
 * Abstract base for every exception thrown from the **domain layer**
 * (entities, value objects, aggregates, business invariants).
 *
 * The class fixes `[ExceptionLayer]` to `"domain"`, leaving subclasses
 * responsible only for `name`, `message`, `source`, and any extra fields
 * needed to explain which invariant was broken.
 *
 * @remarks
 * Domain exceptions describe violations of business rules independent of
 * any transport — typically expressed in HTTP terms as `4xx` (often `422
 * Unprocessable Entity`) but the class itself makes no such assumption.
 *
 * @example
 * ```ts
 * import { DomainException } from "@roastery/terroir/exceptions/models";
 *
 * export class CannotShipNegativeQuantityException extends DomainException {
 *   public readonly name = "Cannot Ship Negative Quantity";
 *
 *   constructor(
 *     public readonly source: string,
 *     public readonly message = `Negative quantity is invalid in ${source}.`,
 *   ) {
 *     super(message);
 *   }
 * }
 * ```
 *
 * @see {@link CoreException}
 * @see {@link ApplicationException}
 * @see {@link InfraException}
 */
export abstract class DomainException extends CoreException {
	/**
	 * Layer discriminator pinned to `"domain"`. Sealed by this abstract class
	 * so concrete subclasses do not need to assign it themselves.
	 */
	public override readonly [ExceptionLayer]: CoreExceptionType = "domain";
}
