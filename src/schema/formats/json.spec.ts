import { describe, expect, it } from "bun:test";
import { FormatRegistry, Type } from "@sinclair/typebox";
import { SchemaManager } from "../schema-manager";
import "./index";

describe("JSON Format", () => {
	const schema = Type.String({ format: "json" });
	const check = FormatRegistry.Get("json") as (value: string) => boolean;

	it("should return true for valid JSON strings", () => {
		const validJson = [
			'{"name":"Roastery"}',
			"[]",
			"[1,2,3]",
			'{"nested":{"key":"value"}}',
			'"string"',
			"123",
			"true",
			"false",
			"null",
			'{"array":[1,2,3],"bool":true,"nullable":null}',
		];

		for (const json of validJson) {
			expect(SchemaManager.match(schema, json)).toBe(true);
			expect(check(json)).toBe(true);
		}
	});

	it("should return false for invalid JSON strings", () => {
		const invalidJson = [
			"{name:'Roastery'}",
			"{'name':'Roastery'}",
			"{name: Roastery}",
			"undefined",
			"",
			"{",
			"}",
			"[1,2,",
			"not json",
			'{"unclosed":',
		];

		for (const json of invalidJson) {
			expect(SchemaManager.match(schema, json)).toBe(false);
			expect(check(json)).toBe(false);
		}
	});
});
