/**
 * Public barrel for the abstract layer base classes that sit between
 * {@link CoreException} and concrete exceptions.
 *
 * Each class fixes the value of `[ExceptionLayer]` for its layer so concrete
 * subclasses only have to fill in `name`, `message` and `source`.
 *
 * @module @roastery/terroir/exceptions/models
 * @see {@link ApplicationException}
 * @see {@link DomainException}
 * @see {@link InfraException}
 */
export { DomainException } from "./domain-exception";
export { InfraException } from "./infra-exception";
export { ApplicationException } from "./application-exception";
