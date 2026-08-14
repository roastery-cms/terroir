/**
 * Symbol keying the per-instance transient store of an `Entity`: an
 * `EntityStorage` holding cached lookups and derived flags that do not belong
 * in the serialized form.
 *
 * @remarks
 * Declared here; the slot is `protected` on the `Entity` base in
 * `@roastery/beans` — subclasses expose whatever facade they want over
 * `this[Storage]`. It never reaches `toJSON()` or the schema, and it starts
 * empty on `fromJSON` / `demo` (statics have no source instance to carry state
 * over from).
 *
 * @see `EntityStorage` in `@roastery/beans/entity` — the runtime class stored
 *   under this key.
 */
export const Storage = Symbol("storage");
