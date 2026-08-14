/**
 * Symbol keying the blueprint of an `Entity` instance: the plain object that
 * maps each domain property name to its `ValueObject` or `Entity` class.
 *
 * @remarks
 * Declared here; written and read by the `Entity` base in `@roastery/beans`.
 *
 * The key is also load-bearing at the type level — conditional types such as
 * `PropertiesOfInstance` match against `{ [Properties]: infer Shape }` — which
 * is the sharpest reason these symbols live in one shared package: a second
 * declaration of `Symbol("properties")` would compare unequal and silently
 * stop those types from resolving.
 *
 * @see `PropertiesShapeBase` in `@roastery/beans/entity/types` — the shape
 *   stored under this key.
 */
export const Properties = Symbol("properties");
