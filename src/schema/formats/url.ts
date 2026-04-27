/**
 * Registers the `"url"` TypeBox format.
 *
 * The validator returns `true` only when both:
 *
 * 1. {@link URL.canParse} accepts `value`, and
 * 2. The parsed `hostname` contains at least one `.` — i.e. it is a
 *    fully-qualified host such as `example.com`. This rejects bare hosts
 *    such as `localhost`, `127.0.0.1`'s shorthand, or single-label intranet
 *    names.
 *
 * @remarks
 * Use the more permissive `"simple-url"` format for development and
 * intranet-style addresses.
 *
 * @example
 * ```ts
 * import "@roastery/terroir/schema"; // registers all formats
 * import { t } from "@roastery/terroir";
 *
 * const Url = t.String({ format: "url" });
 * // matches: "https://example.com/path?q=1"
 * // rejects: "http://localhost:3000"
 * ```
 *
 * @module @roastery/terroir/schema/formats/url
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/URL/canParse_static | URL.canParse}
 */
import { FormatRegistry } from "@sinclair/typebox";

FormatRegistry.Set(
	"url",
	(value) => URL.canParse(value) && new URL(value).hostname.includes("."),
);
