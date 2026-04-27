/**
 * Public package entry point for `@roastery/terroir`.
 *
 * Re-exports the two third-party modules consumers use most often together
 * with the package:
 *
 * - `t` — namespace re-export of {@link https://github.com/sinclairzx81/typebox | @sinclair/typebox},
 *   the runtime/static type system used to build schemas.
 * - `uuid` — namespace re-export of the `uuid` package, used by the `"uuid"`
 *   format registration to validate UUID v7 strings.
 *
 * @remarks
 * Sub-paths of this package (`@roastery/terroir/exceptions`,
 * `@roastery/terroir/schema`, …) expose the framework primitives directly.
 * This root entry point exists primarily to give consumers a single import
 * site for the underlying TypeBox/uuid namespaces.
 *
 * @example
 * ```ts
 * import { t, uuid } from "@roastery/terroir";
 *
 * const Email = t.String({ format: "email" });
 * const id = uuid.v7();
 * ```
 *
 * @module @roastery/terroir
 */
import * as t from "@sinclair/typebox";
import * as uuid from "uuid";

export { t, uuid };
