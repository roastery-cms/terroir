/**
 * Public barrel for every concrete exception that lives in the **application
 * layer** (use-cases, controllers, command handlers).
 *
 * All classes exported here extend {@link ApplicationException} and therefore
 * report `[ExceptionLayer] === "application"`.
 *
 * @module @roastery/terroir/exceptions/application
 * @see {@link ApplicationException}
 */
export { ResourceAlreadyExistsException } from "./resource-already-exists.exception";
export { ResourceNotFoundException } from "./resource-not-found.exception";

export { BadRequestException } from "./bad-request.exception";

export { UnauthorizedException } from "./unauthorized.exception";
export { InvalidOperationException } from "./invalid-operation.exception";
export * from "./jwt";
