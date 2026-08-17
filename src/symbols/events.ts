/**
 * Symbol keying the per-instance domain-event buffer of an `Entity`: events
 * recorded during a business operation and drained by the caller once it
 * completes.
 *
 * @remarks
 * Declared here; written and read by the `Entity` base in `@roastery/beans`.
 * A symbol key keeps the buffer off `Object.keys`/`Object.entries`, so it
 * never reaches `toJSON()` or the schema.
 *
 * @see `DomainEvent` in `@roastery/beans/entity` — the runtime type stored
 *   under this key.
 */
export const Events = Symbol("events");
