/**
 * Symbol keying the entity-type name of an `Entity` instance (e.g. `"post"`),
 * as declared by the subclass's `defineEntity()` in `@roastery/beans`.
 *
 * @remarks
 * The value is used as the `source` of every validation error the entity
 * raises, so failures always name the entity type they came from — the same
 * `source` slot every exception in this package carries.
 *
 * @see `CoreException.source` in `@roastery/terroir/exceptions/core` — where
 *   the value ends up.
 */
export const Source = Symbol("source");
