/**
 * Symbol keying the event-payload form of a domain object: the complete,
 * unredacted serialization an `Entity` or `ValueObject` contributes to a
 * domain event.
 *
 * @remarks
 * This is deliberately not `toJSON()`. `toJSON()` is the public serialization
 * contract — `JSON.stringify` picks it up, persistence relies on it, and
 * `fromJSON` round-trips it. The payload an event carries is a separate
 * contract that has to be free to diverge from it, so it gets its own slot.
 *
 * A symbol key is what makes that free. It stays off `Object.keys` and
 * `Object.entries`, so the traversals that derive the schema and build the
 * context keep iterating only the domain properties; and it never occupies the
 * accessor namespace, so no entity in the ecosystem loses `json` as a usable
 * blueprint property name.
 *
 * Declared here; written and read by the domain bases in `@roastery/beans`.
 *
 * @see {@link SafeJson} — the redacted counterpart, for payloads that leave
 *   the domain.
 * @see {@link Events} — the buffer these payloads are drained from.
 */
export const Json = Symbol("json");
