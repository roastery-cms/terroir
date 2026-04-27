/**
 * Registers the `"email"` TypeBox format.
 *
 * The validator tests `value` against an RFC 5321-flavoured regex:
 *
 * - **Local part:** alphanumerics plus the symbol set
 *   `! # $ % & ' * + / = ? ^ _ \` { | } ~ -`, with single dots allowed
 *   between groups.
 * - **Domain:** one or more labels separated by dots; each label is 1–63
 *   characters long, alphanumeric with optional internal hyphens, never
 *   starting or ending with a hyphen.
 * - **TLD:** 2–63 alphabetic characters.
 *
 * The regex carries the `i` flag so casing is normalised at validation
 * time. The validator does not perform DNS resolution.
 *
 * @example
 * ```ts
 * import "@roastery/terroir/schema"; // registers all formats
 * import { t } from "@roastery/terroir";
 *
 * const Email = t.String({ format: "email" });
 * // matches: "alan@example.com"
 * // rejects: "alan@localhost"
 * ```
 *
 * @module @roastery/terroir/schema/formats/email
 */
import { FormatRegistry } from "@sinclair/typebox";

const emailPattern =
	/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

FormatRegistry.Set("email", (value) => emailPattern.test(value));
