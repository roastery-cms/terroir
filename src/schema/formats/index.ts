/**
 * Aggregator that imports every custom format file for its registration
 * side-effect.
 *
 * Importing this module adds the following keys to TypeBox's
 * `FormatRegistry`:
 *
 * - `"date-time"` — accepted by {@link Date.parse}.
 * - `"url"` — `URL.canParse` plus FQDN hostname check.
 * - `"uuid"` — UUID v7 only (validated through the `uuid` package).
 * - `"slug"` — URL-safe lowercase slug pattern.
 * - `"email"` — RFC 5321-flavoured email regex.
 * - `"json"` — `JSON.parse` succeeds.
 * - `"simple-url"` — `URL.canParse`, no hostname constraint.
 *
 * The registrations execute on first import and are global to the TypeBox
 * runtime; importing this file twice is harmless.
 *
 * @module @roastery/terroir/schema/formats
 */
import "./date-time";
import "./url";
import "./uuid";
import "./slug";
import "./email";
import "./json";
import "./simple-url";
