import { describe, expect, it } from "bun:test";
import { Type } from "@sinclair/typebox";
import { SchemaManager } from "../schema-manager";
import "./index";

describe("Email Format", () => {
	const schema = Type.String({ format: "email" });

	it("should return true for valid emails", () => {
		const validEmails = [
			"test@example.com",
			"user.name@domain.co.uk",
			"user+tag@domain.com",
			"123456@domain.info",
			"test@sub.domain.com",
			"abc@example-domain.com",
		];

		for (const email of validEmails) {
			expect(SchemaManager.match(schema, email)).toBe(true);
		}
	});

	it("should return false for invalid emails", () => {
		const invalidEmails = [
			"invalid-email",
			"test@",
			"@domain.com",
			"test@domain",
			"test @domain.com",
			"test@domain..com",
			"test@domain.c", // TLD muito curto (opcional dependendo da regra, mas comum exigir 2+)
			".test@domain.com",
		];

		for (const email of invalidEmails) {
			expect(SchemaManager.match(schema, email)).toBe(false);
		}
	});
});
