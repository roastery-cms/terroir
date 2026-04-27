/**
 * Registers the `"simple-url"` TypeBox format.
 *
 * The validator delegates to {@link URL.canParse}, which accepts any string
 * the WHATWG URL parser considers valid — including hosts without a TLD
 * (e.g. `http://localhost`) and non-HTTP schemes.
 *
 * @remarks
 * Use the stricter `"url"` format when the value must be a fully-qualified
 * web address.
 *
 * @example
 * ```ts
 * import "@roastery/terroir/schema"; // registers all formats
 * import { t } from "@roastery/terroir";
 *
 * const Url = t.String({ format: "simple-url" });
 * // matches: "http://localhost:3000"
 * // matches: "ftp://files.example.com"
 * // rejects: "not a url"
 * ```
 *
 * @module @roastery/terroir/schema/formats/simple-url
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/URL/canParse_static | URL.canParse}
 */
import { FormatRegistry } from "@sinclair/typebox";

FormatRegistry.Set("simple-url", (value) => URL.canParse(value));
