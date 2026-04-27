/**
 * Registers the `"slug"` TypeBox format.
 *
 * The validator tests `value` against the regex
 * `/^[a-z0-9]+(?:-[a-z0-9]+)*$/`, which accepts URL-safe slugs:
 *
 * - one or more lowercase alphanumerics,
 * - optionally followed by `-`-separated alphanumeric groups,
 * - no leading or trailing hyphen,
 * - no whitespace, underscores, or upper-case characters.
 *
 * @example
 * ```ts
 * import "@roastery/terroir/schema"; // registers all formats
 * import { t } from "@roastery/terroir";
 *
 * const Slug = t.String({ format: "slug" });
 * // matches: "my-awesome-post", "post123"
 * // rejects: "My-Post", "post--two", "-leading"
 * ```
 *
 * @module @roastery/terroir/schema/formats/slug
 */
import { FormatRegistry } from "@sinclair/typebox";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

FormatRegistry.Set("slug", (value) => slugPattern.test(value));
