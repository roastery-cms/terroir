/**
 * Registers the `"json"` TypeBox format.
 *
 * The validator returns `true` when `value` can be parsed by
 * {@link JSON.parse} without throwing, and `false` otherwise. It does not
 * inspect the parsed shape — pair it with a structured schema if you need
 * to validate the contents.
 *
 * @example
 * ```ts
 * import "@roastery/terroir/schema"; // registers all formats
 * import { t } from "@roastery/terroir";
 *
 * const RawJson = t.String({ format: "json" });
 * // matches: '{"a":1}'
 * // rejects: '{a:1}'
 * ```
 *
 * @module @roastery/terroir/schema/formats/json
 */
import { FormatRegistry } from "@sinclair/typebox";

FormatRegistry.Set("json", (value) => {
	try {
		JSON.parse(value);
	} catch {
		return false;
	}
	return true;
});
