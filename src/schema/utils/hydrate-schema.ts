import { Kind } from "@sinclair/typebox/type";

export function hydrateSchema(schema: any): any {
    if (typeof schema !== "object" || schema === null) return schema;
    if (Array.isArray(schema)) return schema.map(hydrateSchema);

    const newSchema = { ...schema };

    if (newSchema.properties) {
        for (const key in newSchema.properties) {
            newSchema.properties[key] = hydrateSchema(
                newSchema.properties[key],
            );
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
