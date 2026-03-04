import { describe, expect, it } from "bun:test";
import { Type } from "@sinclair/typebox";
import { Schema } from "./schema";

describe("Schema", () => {
	const schema = Type.Object({
		name: Type.String(),
		age: Type.Number(),
	});

	it("should create an instance using constructor", () => {
		const validator = new Schema(schema);
		expect(validator).toBeInstanceOf(Schema);
	});

	it("should create an instance using make static method", () => {
		const validator = Schema.make(schema);
		expect(validator).toBeInstanceOf(Schema);
	});

	it("should return true for valid data", () => {
		const validator = new Schema(schema);
		const data = { name: "John", age: 30 };
		expect(validator.match(data)).toBe(true);
	});

	it("should return false for invalid data type", () => {
		const validator = new Schema(schema);
		const data = { name: "John", age: "30" };
		expect(validator.match(data)).toBe(false);
	});

	it("should return false for missing properties", () => {
		const validator = new Schema(schema);
		const data = { name: "John" };
		expect(validator.match(data)).toBe(false);
	});

	it("should return JSON string representation of the schema", () => {
		const validator = new Schema(schema);
		const json = validator.toString();
		expect(typeof json).toBe("string");
		expect(JSON.parse(json)).toEqual(JSON.parse(JSON.stringify(schema)));
	});

	it("should return the original schema object via toJSON", () => {
		const validator = new Schema(schema);
		expect(validator.toJSON()).toEqual(schema);
	});
	describe("map", () => {
		it("should map valid data correctly", () => {
			const validator = new Schema(schema);
			const data = { name: "John", age: 30 };
			const result = validator.map(data);
			expect(result).toEqual(data);
		});

		it("should strip unknown properties", () => {
			const validator = new Schema(schema);
			const data = { name: "John", age: 30, extra: "field" };
			const result = validator.map(data);
			expect(result).toEqual({ name: "John", age: 30 });
			// @ts-expect-error - testing runtime behavior
			expect(result.extra).toBeUndefined();
		});

		it("should use default values", () => {
			const schemaWithDefault = Type.Object({
				name: Type.String(),
				role: Type.String({ default: "user" }),
			});
			const validator = new Schema(schemaWithDefault);
			const data = { name: "Jane" };
			const result = validator.map(data);
			expect(result).toEqual({ name: "Jane", role: "user" });
		});

		it("should convert compatible types", () => {
			const validator = new Schema(schema);
			const data = { name: "John", age: "30" }; // "30" string should convert to 30 number
			const result = validator.map(data);
			expect(result).toEqual({ name: "John", age: 30 });
		});
	});
});
