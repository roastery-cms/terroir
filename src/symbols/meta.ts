/**
 * Symbol keying the metadata of a `ValueObject` instance: the schema that
 * validates its values and the default used in demo mode.
 *
 * @remarks
 * Declared here; the base class in `@roastery/beans` fills this slot from the
 * subclass's `defineMeta()` during construction — subclasses never assign it
 * directly.
 *
 * @see `IValueObjectMetadata` in `@roastery/beans/value-object/types` — the
 *   `{ default, model }` payload stored under this key.
 * @see {@link Demo} — the sentinel that makes the `default` half of that
 *   payload load-bearing.
 */
export const Meta = Symbol("meta");
