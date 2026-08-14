/**
 * Public barrel for every concrete exception that lives in the **application
 * layer** (use-cases, controllers, command handlers).
 *
 * All classes exported here extend {@link ApplicationException} and therefore
 * report `[Layer] === "application"`.
 *
 * The catalogue covers every HTTP error status registered by the IANA (`4xx`
 * and `5xx`). Four statuses are served by domain-flavoured names that predate
 * the catalogue and are kept as the canonical class for their code:
 * `BadRequestException` (400), `UnauthorizedException` (401),
 * `ResourceNotFoundException` (404) and `ResourceAlreadyExistsException`
 * (409). `InvalidOperationException` has no status of its own — it describes
 * a use-case rejected because of the current application state.
 *
 * @module @roastery/terroir/exceptions/application
 * @see {@link ApplicationException}
 */
export { ResourceAlreadyExistsException } from "./resource-already-exists.exception";
export { ResourceNotFoundException } from "./resource-not-found.exception";

export { BadRequestException } from "./bad-request.exception";

export { UnauthorizedException } from "./unauthorized.exception";
export { InvalidOperationException } from "./invalid-operation.exception";

// 4xx — client errors
export { PaymentRequiredException } from "./payment-required.exception";
export { ForbiddenException } from "./forbidden.exception";
export { MethodNotAllowedException } from "./method-not-allowed.exception";
export { NotAcceptableException } from "./not-acceptable.exception";
export { ProxyAuthenticationRequiredException } from "./proxy-authentication-required.exception";
export { RequestTimeoutException } from "./request-timeout.exception";
export { GoneException } from "./gone.exception";
export { LengthRequiredException } from "./length-required.exception";
export { PreconditionFailedException } from "./precondition-failed.exception";
export { ContentTooLargeException } from "./content-too-large.exception";
export { UriTooLongException } from "./uri-too-long.exception";
export { UnsupportedMediaTypeException } from "./unsupported-media-type.exception";
export { RangeNotSatisfiableException } from "./range-not-satisfiable.exception";
export { ExpectationFailedException } from "./expectation-failed.exception";
export { ImATeapotException } from "./im-a-teapot.exception";
export { MisdirectedRequestException } from "./misdirected-request.exception";
export { UnprocessableContentException } from "./unprocessable-content.exception";
export { LockedException } from "./locked.exception";
export { FailedDependencyException } from "./failed-dependency.exception";
export { TooEarlyException } from "./too-early.exception";
export { UpgradeRequiredException } from "./upgrade-required.exception";
export { PreconditionRequiredException } from "./precondition-required.exception";
export { TooManyRequestsException } from "./too-many-requests.exception";
export { RequestHeaderFieldsTooLargeException } from "./request-header-fields-too-large.exception";
export { UnavailableForLegalReasonsException } from "./unavailable-for-legal-reasons.exception";

// 5xx — server errors
export { InternalServerErrorException } from "./internal-server-error.exception";
export { NotImplementedException } from "./not-implemented.exception";
export { BadGatewayException } from "./bad-gateway.exception";
export { ServiceUnavailableException } from "./service-unavailable.exception";
export { GatewayTimeoutException } from "./gateway-timeout.exception";
export { HttpVersionNotSupportedException } from "./http-version-not-supported.exception";
export { VariantAlsoNegotiatesException } from "./variant-also-negotiates.exception";
export { InsufficientStorageException } from "./insufficient-storage.exception";
export { LoopDetectedException } from "./loop-detected.exception";
export { NotExtendedException } from "./not-extended.exception";
export { NetworkAuthenticationRequiredException } from "./network-authentication-required.exception";
