/**
 * Public barrel for the schema module.
 *
 * Importing this file (directly or transitively through
 * {@link SchemaManager}) registers the package's custom TypeBox formats —
 * `"date-time"`, `"email"`, `"json"`, `"simple-url"`, `"slug"`, `"url"`,
 * `"uuid"` — via the side-effect import below.
 *
 * Schemas themselves are plain TypeBox values: build them with `t` (or
 * `Type`) and pass them around directly.
 *
 * @module @roastery/terroir/schema
 * @see {@link SchemaManager}
 */
import "./formats";

export { SchemaManager } from "./schema-manager";
