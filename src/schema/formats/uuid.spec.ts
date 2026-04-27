import { describe, expect, it } from "bun:test";
import { Type } from "@sinclair/typebox";
import { v1, v4, v7 } from "uuid";
import { Schema } from "../schema";
import "./index";

describe("UUID Format", () => {
	const schema = new Schema(Type.String({ format: "uuid" }));

	it("should return true for valid UUID v7 strings", () => {
		for (let i = 0; i < 5; i++) {
			expect(schema.match(v7())).toBe(true);
		}
	});

	it("should return false for UUIDs in other versions", () => {
		expect(schema.match(v1())).toBe(false);
		expect(schema.match(v4())).toBe(false);
		expect(schema.match("00000000-0000-0000-0000-000000000000")).toBe(false);
	});

	it("should return false for invalid UUID strings", () => {
		const invalidUuids = [
			"not-a-uuid",
			"",
			"123",
			"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
			"01890a5d-ac96-774b-bdfa-be20a2f57e2", // muito curto
		];

		for (const uuid of invalidUuids) {
			expect(schema.match(uuid)).toBe(false);
		}
	});
});
