/**
 * Registers the `"date-time"` TypeBox format.
 *
 * The validator returns `true` when {@link Date.parse} produces a finite
 * timestamp for `value`, and `false` otherwise. Effectively delegates the
 * decision to the JavaScript engine's built-in date parser, which accepts
 * ISO 8601 along with a handful of legacy formats.
 *
 * @example
 * ```ts
 * import "@roastery/terroir/schema"; // registers all formats
 * import { t } from "@roastery/terroir";
 *
 * const When = t.String({ format: "date-time" });
 * // matches: "2026-04-27T12:34:56Z"
 * // rejects: "not-a-date"
 * ```
 *
 * @module @roastery/terroir/schema/formats/date-time
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse | Date.parse}
 */
import { FormatRegistry } from "@sinclair/typebox";

FormatRegistry.Set("date-time", (value) => {
	return !Number.isNaN(Date.parse(value));
});
