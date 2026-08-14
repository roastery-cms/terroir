/**
 * Public barrel for every concrete exception that lives in the **domain
 * layer** (entities, value objects, aggregates, business invariants).
 *
 * All classes exported here extend {@link DomainException} and therefore
 * report `[Layer] === "domain"`.
 *
 * @module @roastery/terroir/exceptions/domain
 * @see {@link DomainException}
 */
export { InvalidDomainDataException } from "./invalid-domain-data.exception";
export { OperationFailedException } from "./operation-failed.exception";
export { InvalidPropertyException } from "./invalid-property.exception";

// Property-level invariants
export { ImmutablePropertyException } from "./immutable-property.exception";
export { PropertyNameCollisionException } from "./property-name-collision.exception";
export { IncompleteIdentityException } from "./incomplete-identity.exception";

// Modelling contract
export { InvalidEntityDefinitionException } from "./invalid-entity-definition.exception";
export { CyclicEntityDefinitionException } from "./cyclic-entity-definition.exception";
