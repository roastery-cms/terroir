import { describe, expect, it } from "bun:test";
import { Kind, Type, type TObject } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { SchemaManager } from "./schema-manager";

describe("SchemaManager", () => {
	const schema = Type.Object({
		name: Type.String(),
	});

	describe("build", () => {
		it("should rebuild a usable TypeBox schema from a serialized one", () => {
			const serialized = SchemaManager.serialize(schema);
			const rebuilt = SchemaManager.build<TObject>(serialized);

			expect(rebuilt[Kind]).toBe("Object");

			expect(SchemaManager.match(rebuilt, { name: "Test" })).toBe(true);
			expect(SchemaManager.match(rebuilt, { name: 123 })).toBe(false);
		});

		it("should return a schema TypeBox itself accepts", () => {
			const rebuilt = SchemaManager.build<TObject>(
				SchemaManager.serialize(schema),
			);

			expect(Value.Check(rebuilt, { name: "Test" })).toBe(true);
			expect(Value.Check(rebuilt, { name: 123 })).toBe(false);
		});

		it("should round-trip without storing anything but the schema", () => {
			const serialized = SchemaManager.serialize(schema);
			const rebuilt = SchemaManager.build<TObject>(serialized);

			expect(SchemaManager.serialize(rebuilt)).toEqual(serialized);
		});

		it("should throw for invalid JSON", () => {
			expect(() => SchemaManager.build("invalid json")).toThrow();
		});
	});

	describe("serialize", () => {
		it("should serialize a schema to JSON", () => {
			expect(SchemaManager.serialize(schema)).toEqual(JSON.stringify(schema));
		});
	});

	describe("match", () => {
		it("should return true for valid data", () => {
			expect(SchemaManager.match(schema, { name: "Alan" })).toBe(true);
		});

		it("should return false for invalid data", () => {
			expect(SchemaManager.match(schema, { name: 123 })).toBe(false);
			expect(SchemaManager.match(schema, {})).toBe(false);
		});

		it("should reuse the compiled validator across calls", () => {
			const reusable = Type.Object({ age: Type.Number() });

			expect(SchemaManager.match(reusable, { age: 1 })).toBe(true);
			expect(SchemaManager.match(reusable, { age: 2 })).toBe(true);
			expect(SchemaManager.match(reusable, { age: "3" })).toBe(false);
		});
	});

	describe("isSchema", () => {
		it("should return true for a valid schema string", () => {
			expect(SchemaManager.isSchema(SchemaManager.serialize(schema))).toBe(
				true,
			);
		});

		it("should return true for a valid schema object", () => {
			expect(SchemaManager.isSchema(schema)).toBe(true);
		});

		it("should return false for invalid input", () => {
			expect(SchemaManager.isSchema("invalid json")).toBe(false);
			expect(SchemaManager.isSchema(null)).toBe(false);
		});
	});
});
