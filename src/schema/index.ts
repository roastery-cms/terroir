/**
 * Public barrel for the schema module.
 *
 * Importing this file (directly or transitively through {@link Schema} /
 * {@link SchemaManager}) registers the package's custom TypeBox formats —
 * `"date-time"`, `"email"`, `"json"`, `"simple-url"`, `"slug"`, `"url"`,
 * `"uuid"` — via the side-effect import below.
 *
 * @module @roastery/terroir/schema
 * @see {@link Schema}
 * @see {@link SchemaManager}
 */
import "./formats";

export { Schema } from "./schema";
export { SchemaManager } from "./schema-manager";
