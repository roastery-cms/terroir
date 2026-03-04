import { describe, expect, it } from "bun:test";
import { Type } from "@sinclair/typebox";
import { SchemaManager } from "./schema-manager";
import { Schema } from "./schema";

describe("SchemaManager", () => {
	const schema = Type.Object({
		name: Type.String(),
	});

	it("should build a SchemaValidator from a serialized schema", () => {
		const serialized = JSON.stringify(schema);
		const validator = SchemaManager.build(serialized);

		expect(validator).toBeInstanceOf(Schema);

		// Verify functionality
		expect(validator.match({ name: "Test" })).toBe(true);
		expect(validator.match({ name: 123 })).toBe(false);

		// Verify integrity (Round-trip)
		// This ensures we are not storing a compiled function as the schema
		expect(validator.toString()).toEqual(serialized);
	});

	it("should return true for isSchema with valid schema string", () => {
		const serialized = JSON.stringify(schema);
		expect(SchemaManager.isSchema(serialized)).toBe(true);
	});

	it("should return true for isSchema with valid schema object", () => {
		expect(SchemaManager.isSchema(schema)).toBe(true);
	});

	it("should return false for isSchema with invalid input", () => {
		expect(SchemaManager.isSchema("invalid json")).toBe(false);
		expect(SchemaManager.isSchema(null)).toBe(false);
	});
});
