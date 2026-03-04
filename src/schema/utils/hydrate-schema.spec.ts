import { describe, expect, it } from "bun:test";
import { hydrateSchema } from "./hydrate-schema";
import { Type, Kind } from "@sinclair/typebox";

describe("hydrateSchema", () => {
    it("should return the schema as is if not an object or null", () => {
        expect(hydrateSchema(null)).toBe(null);
        expect(hydrateSchema("string")).toBe("string");
        expect(hydrateSchema(123)).toBe(123);
    });

    it("should hydrate an array of schemas", () => {
        const schemas = [Type.String(), Type.Number()];
        const hydrated = hydrateSchema(schemas);
        expect(hydrated).toHaveLength(2);
        expect(hydrated[0][Kind]).toBe("String");
        expect(hydrated[1][Kind]).toBe("Number");
    });

    it("should hydrate nested properties", () => {
        const schema = Type.Object({
            foo: Type.String(),
            bar: Type.Number(),
        });
        // Simulate serialization loss of symbols
        const json = JSON.parse(JSON.stringify(schema));
        const hydrated = hydrateSchema(json);

        expect(hydrated.properties.foo[Kind]).toBe("String");
        expect(hydrated.properties.bar[Kind]).toBe("Number");
    });

    it("should hydrate items in array (single schema)", () => {
        const schema = Type.Array(Type.String());
        const json = JSON.parse(JSON.stringify(schema));
        const hydrated = hydrateSchema(json);

        expect(hydrated.items[Kind]).toBe("String");
        expect(hydrated[Kind]).toBe("Array");
    });

    it("should hydrate additionalProperties if it is a schema", () => {
        const schema = Type.Object({}, { additionalProperties: Type.String() });
        const json = JSON.parse(JSON.stringify(schema));
        const hydrated = hydrateSchema(json);

        expect(hydrated.additionalProperties[Kind]).toBe("String");
    });

    it("should hydrate anyOf, allOf, oneOf, not", () => {
        const schema = Type.Union([Type.String(), Type.Number()]);
        const json = JSON.parse(JSON.stringify(schema));
        const hydrated = hydrateSchema(json);

        expect(hydrated.anyOf).toHaveLength(2);
        expect(hydrated.anyOf![0][Kind]).toBe("String");
        expect(hydrated[Kind]).toBe("Union");

        const oneOfSchema = { oneOf: [{ type: "string" }, { type: "number" }] };
        const hydratedOneOf = hydrateSchema(oneOfSchema);
        expect(hydratedOneOf.oneOf).toHaveLength(2);
        expect(hydratedOneOf.oneOf[0][Kind]).toBe("String");

        const intersect = Type.Intersect([Type.String(), Type.Object({})]);
        const jsonIntersect = JSON.parse(JSON.stringify(intersect));
        const hydratedIntersect = hydrateSchema(jsonIntersect);
        expect(hydratedIntersect.allOf).toHaveLength(2);
        expect(hydratedIntersect[Kind]).toBe("Intersect");

        // Not
        const notSchema = Type.Not(Type.String());
        const jsonNot = JSON.parse(JSON.stringify(notSchema));
        const hydratedNot = hydrateSchema(jsonNot);
        expect(hydratedNot.not[Kind]).toBe("String");
        expect(hydratedNot[Kind]).toBe("Not");
    });

    it("should restore Kind for primitive types", () => {
        expect(hydrateSchema({ type: "string" })[Kind]).toBe("String");
        expect(hydrateSchema({ type: "number" })[Kind]).toBe("Number");
        expect(hydrateSchema({ type: "integer" })[Kind]).toBe("Integer");
        expect(hydrateSchema({ type: "boolean" })[Kind]).toBe("Boolean");
        expect(hydrateSchema({ type: "array" })[Kind]).toBe("Array");
        expect(hydrateSchema({ type: "object" })[Kind]).toBe("Object");
        expect(hydrateSchema({ type: "null" })[Kind]).toBe("Null");
    });

    it("should restore Kind for Literal", () => {
        const schema = Type.Literal("foo");
        const json = JSON.parse(JSON.stringify(schema));
        const hydrated = hydrateSchema(json);
        expect(hydrated[Kind]).toBe("Literal");
    });

    it("should restore Kind for Tuple", () => {
        const schema = Type.Tuple([Type.String(), Type.Number()]);
        const json = JSON.parse(JSON.stringify(schema));
        const hydrated = hydrateSchema(json);
        expect(hydrated[Kind]).toBe("Tuple");
        expect(hydrated.items).toHaveLength(2);
        // Tuple items in JSON schema are an array of schemas
        expect(hydrated.items[0][Kind]).toBe("String");
    });

    it("should restore Kind for Record (patternProperties without properties)", () => {
        const schema = Type.Record(Type.String(), Type.Number());
        const json = JSON.parse(JSON.stringify(schema));
        const hydrated = hydrateSchema(json);

        expect(hydrated[Kind]).toBe("Record");
        const keys = Object.keys(hydrated.patternProperties);
        expect(keys.length).toBeGreaterThan(0);
        expect(hydrated.patternProperties[keys[0] as never][Kind]).toBe(
            "Number",
        );
    });

    it("should hydrate patternProperties even if not a Record-only object (mixed)", () => {
        // Technically TypeBox doesn't easily produce this, but manually:
        const schema = {
            type: "object",
            properties: { a: { type: "string" } },
            patternProperties: { "^b": { type: "number" } },
        };
        const hydrated = hydrateSchema(schema);
        expect(hydrated.properties.a[Kind]).toBe("String");
        expect(hydrated.patternProperties["^b"][Kind]).toBe("Number");
    });

    it("should restore Kind for Any (empty object)", () => {
        const schema = Type.Any();
        const json = JSON.parse(JSON.stringify(schema));
        // Empty object {}
        const hydrated = hydrateSchema(json);
        expect(hydrated[Kind]).toBe("Any");
    });
});
