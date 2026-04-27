/**
 * Public barrel for every concrete exception that lives in the **domain
 * layer** (entities, value objects, aggregates, business invariants).
 *
 * All classes exported here extend {@link DomainException} and therefore
 * report `[ExceptionLayer] === "domain"`.
 *
 * @module @roastery/terroir/exceptions/domain
 * @see {@link DomainException}
 */
export { InvalidDomainDataException } from "./invalid-domain-data.exception";
export { OperationFailedException } from "./operation-failed.exception";
export { InvalidPropertyException } from "./invalid-property.exception";
