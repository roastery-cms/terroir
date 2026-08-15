/**
 * Symbol keying the per-property rules of an `Entity` blueprint in
 * `@roastery/beans`: a partial map of blueprint key to `{ default }` or
 * `{ derive }`, describing how a property is filled when the construction
 * payload omits it.
 *
 * @remarks
 * The rules live on the blueprint object itself rather than beside it, so a
 * blueprint stays a single value that can be passed around and inspected as
 * one. A symbol key is what makes that free: `Object.keys` and
 * `Object.entries` skip it, so the traversals that derive the schema and build
 * the context keep iterating only the domain properties.
 *
 * Declared here; written by `blueprint().with()` and read by the `Entity` base
 * in `@roastery/beans`.
 *
 * @see `blueprint` in `@roastery/beans/entity/helpers` — the only sanctioned
 *   way to write this slot.
 * @see {@link Properties} — the blueprint itself, which this slot annotates.
 */
export const Rules = Symbol("rules");
