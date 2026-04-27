/**
 * Registers the `"uuid"` TypeBox format.
 *
 * The validator returns `true` only when `value` is a syntactically valid
 * UUID **and** specifically a UUID **v7**. Other versions (v1, v3, v4, v5)
 * are rejected so that downstream code can rely on the time-ordered prefix
 * v7 provides — useful for indexable primary keys.
 *
 * @example
 * ```ts
 * import "@roastery/terroir/schema"; // registers all formats
 * import { t, uuid } from "@roastery/terroir";
 *
 * const Id = t.String({ format: "uuid" });
 * // matches: any valid UUID v7 string (uuid.v7())
 * // rejects: UUID v4 strings (uuid.v4()) and any non-UUID string
 * ```
 *
 * @module @roastery/terroir/schema/formats/uuid
 */
import { FormatRegistry } from "@sinclair/typebox";
import { validate, version } from "uuid";

FormatRegistry.Set("uuid", (value) => validate(value) && version(value) === 7);
