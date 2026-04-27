import { Kind } from "@sinclair/typebox/type";

/**
 * Re-attaches the TypeBox `[Kind]` symbol to a JSON-deserialised schema so
 * the resulting object can be passed to TypeBox's compiler/validator.
 *
 * TypeBox identifies the shape of every schema node (`String`, `Object`,
 * `Union`, …) through a non-enumerable `[Kind]` symbol. When a schema is
 * serialised with `JSON.stringify` that symbol is dropped; without it the
 * compiler cannot recognise the payload as a schema. This helper walks the
 * tree, copies it shallowly node-by-node, and writes the appropriate
 * `[Kind]` value back.
 *
 * @remarks
 * Mapping rules applied (in order, last write wins):
 *
 * | Detected feature                                               | `[Kind]` written |
 * | -------------------------------------------------------------- | ---------------- |
 * | `type === "string"`                                            | `"String"`       |
 * | `type === "number"`                                            | `"Number"`       |
 * | `type === "integer"`                                           | `"Integer"`      |
 * | `type === "boolean"`                                           | `"Boolean"`      |
 * | `type === "array"`                                             | `"Array"`        |
 * | `type === "object"`                                            | `"Object"`       |
 * | `type === "null"`                                              | `"Null"`         |
 * | `anyOf` present                                                | `"Union"`        |
 * | `allOf` present                                                | `"Intersect"`    |
 * | `not` present                                                  | `"Not"`          |
 * | `const !== undefined`                                          | `"Literal"`      |
 * | `type === "array"` and `items` is an array (positional)        | `"Tuple"`        |
 * | `type === "object"`, has `patternProperties`, no `properties`  | `"Record"`       |
 * | empty schema (no recognised marker)                            | `"Any"`          |
 *
 * Recursion targets: `properties`, `items`, `additionalProperties` (when an
 * object), `anyOf`, `allOf`, `oneOf`, `not`, and `patternProperties`.
 *
 * The function returns a **new** object tree; the input is never mutated.
 *
 * @param schema - A JSON-deserialised TypeBox schema (object, array, or
 *   primitive). Typed as `any` because the input is, by definition,
 *   structurally validated only after this function runs.
 * @returns A shallow-cloned schema tree with `[Kind]` populated on every
 *   node that represents a TypeBox type.
 *
 * @example
 * ```ts
 * import { hydrateSchema } from "@roastery/terroir/schema/utils/hydrate-schema";
 * import { Kind } from "@sinclair/typebox/type";
 *
 * const wire = JSON.parse('{"type":"string","format":"email"}');
 * const hydrated = hydrateSchema(wire);
 * hydrated[Kind]; // → "String"
 * ```
 *
 * @see {@link SchemaManager.build}
 * @see {@link Schema}
 */
// biome-ignore lint/suspicious/noExplicitAny: schema is narrowed to TSchema inside the function
export function hydrateSchema(schema: any): any {
	if (typeof schema !== "object" || schema === null) return schema;
	if (Array.isArray(schema)) return schema.map(hydrateSchema);

	const newSchema = { ...schema };

	if (newSchema.properties) {
		for (const key in newSchema.properties) {
			newSchema.properties[key] = hydrateSchema(newSchema.properties[key]);
		}
	}
	if (newSchema.items) {
		newSchema.items = hydrateSchema(newSchema.items);
	}
	if (
		newSchema.additionalProperties &&
		typeof newSchema.additionalProperties === "object"
	) {
		newSchema.additionalProperties = hydrateSchema(
			newSchema.additionalProperties,
		);
	}
	if (newSchema.anyOf) newSchema.anyOf = newSchema.anyOf.map(hydrateSchema);
	if (newSchema.allOf) newSchema.allOf = newSchema.allOf.map(hydrateSchema);
	if (newSchema.oneOf) newSchema.oneOf = newSchema.oneOf.map(hydrateSchema);
	if (newSchema.not) newSchema.not = hydrateSchema(newSchema.not);

	if (newSchema.type === "string") newSchema[Kind] = "String";
	else if (newSchema.type === "number") newSchema[Kind] = "Number";
	else if (newSchema.type === "integer") newSchema[Kind] = "Integer";
	else if (newSchema.type === "boolean") newSchema[Kind] = "Boolean";
	else if (newSchema.type === "array") newSchema[Kind] = "Array";
	else if (newSchema.type === "object") newSchema[Kind] = "Object";
	else if (newSchema.type === "null") newSchema[Kind] = "Null";

	if (newSchema.anyOf) newSchema[Kind] = "Union";
	if (newSchema.allOf) newSchema[Kind] = "Intersect";
	if (newSchema.not) newSchema[Kind] = "Not";

	if (newSchema.const !== undefined) newSchema[Kind] = "Literal";

	// Tuples (items checks)
	if (newSchema.type === "array" && Array.isArray(newSchema.items)) {
		newSchema[Kind] = "Tuple";
	}

	if (
		newSchema.type === "object" &&
		newSchema.patternProperties &&
		!newSchema.properties
	) {
		newSchema[Kind] = "Record";
		// Hydrate patternProperties
		for (const key in newSchema.patternProperties) {
			newSchema.patternProperties[key] = hydrateSchema(
				newSchema.patternProperties[key],
			);
		}
	} else if (newSchema.patternProperties) {
		for (const key in newSchema.patternProperties) {
			newSchema.patternProperties[key] = hydrateSchema(
				newSchema.patternProperties[key],
			);
		}
	}

	if (Object.keys(newSchema).length === 0) {
		newSchema[Kind] = "Any";
	}

	return newSchema;
}
