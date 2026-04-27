import { TypeCompiler } from "@sinclair/typebox/compiler";
import { Schema } from "./schema";
import { hydrateSchema } from "@/schema/utils/hydrate-schema";
import type { TSchema } from "@sinclair/typebox";

/**
 * Static helper for materialising {@link Schema} instances from
 * JSON-serialised TypeBox schemas (e.g. schemas stored in a database, sent
 * over the wire, or persisted in configuration).
 *
 * TypeBox schemas rely on a non-enumerable `[Kind]` symbol to identify the
 * shape of each node. JSON serialisation strips that symbol; `SchemaManager`
 * re-attaches it through {@link hydrateSchema} before handing the payload
 * to {@link TypeCompiler.Compile}.
 *
 * @example
 * ```ts
 * import { SchemaManager, type Schema } from "@roastery/terroir/schema";
 * import { t } from "@roastery/terroir";
 *
 * // 1) Producer side: compile and serialise.
 * const wire = JSON.stringify(t.Object({ name: t.String() }));
 *
 * // 2) Consumer side: rebuild a typed Schema.
 * const schema: Schema<ReturnType<typeof t.Object>> = SchemaManager.build(wire);
 * schema.match({ name: "Alan" }); // → true
 *
 * // 3) Validate an unknown payload before parsing it.
 * SchemaManager.isSchema(wire);                 // → true
 * SchemaManager.isSchema('{"type":"banana"}');  // → false
 * ```
 *
 * @see {@link Schema}
 * @see {@link hydrateSchema}
 */
export const SchemaManager = {
	/**
	 * Parses a JSON-serialised TypeBox schema, re-hydrates it with
	 * {@link hydrateSchema}, and returns a compiled {@link Schema} ready to
	 * use.
	 *
	 * @typeParam SchemaType - The {@link TSchema} the wire payload represents.
	 *   The caller specifies it explicitly (or via inference from a type
	 *   annotation) — `JSON.parse` cannot recover it on its own.
	 * @param schema - JSON string produced by `JSON.stringify(<TSchema>)` or
	 *   {@link Schema.toString}.
	 * @returns A compiled {@link Schema}<`SchemaType`>.
	 *
	 * @throws {SyntaxError} If `schema` is not valid JSON.
	 * @throws Propagates errors from {@link TypeCompiler.Compile} when the
	 *   hydrated payload is not a valid TypeBox schema.
	 */
	build<SchemaType extends TSchema>(schema: string): Schema<SchemaType> {
		const parsedSchema = JSON.parse(schema);
		const hydrated = hydrateSchema(parsedSchema);

		return new Schema(hydrated);
	},

	/**
	 * Validates that the given value can be hydrated and compiled as a
	 * TypeBox schema. Accepts either a JSON string or an already-parsed
	 * object.
	 *
	 * Never throws — any failure (parsing, hydration or compilation) is
	 * caught internally and converted to `false`.
	 *
	 * @param schema - Either a JSON string or a JavaScript object that may
	 *   represent a TypeBox schema.
	 * @returns `true` if the value compiles successfully, `false` otherwise.
	 */
	isSchema(schema: unknown): boolean {
		try {
			if (typeof schema === "string") schema = JSON.parse(schema);

			const hydrated = hydrateSchema(schema);
			TypeCompiler.Compile(hydrated as never);

			return true;
		} catch (_) {
			return false;
		}
	},
};
