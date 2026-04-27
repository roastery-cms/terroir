/**
 * Public barrel for **internal-layer** exceptions thrown by the framework
 * itself rather than by application/domain/infra code.
 *
 * All classes exported here extend {@link CoreException} directly and report
 * `[ExceptionLayer] === "internal"`.
 *
 * @module @roastery/terroir/exceptions
 * @see {@link CoreException}
 */
export { InvalidEntityDataException } from "./entity-validation.exception";
export { InvalidObjectValueException } from "./invalid-object-value.exception";
export { UnknownException } from "./unknown.exception";
