/**
 * Symbol keying the identification context of a domain object.
 *
 * On a `ValueObject` instance it stores the `{ name, source }` payload used to
 * build human-readable validation errors. On an `Entity` instance it stores
 * the built property map: identity value-objects plus one built property per
 * blueprint key.
 *
 * @remarks
 * Declared here; written and read by the domain bases in `@roastery/beans`.
 *
 * @see `IValueObjectContext` in `@roastery/beans/value-object/types` — the
 *   payload a value-object keeps under this key.
 */
export const Context = Symbol("context");
