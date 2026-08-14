import { describe, expect, it } from "bun:test";
import { FormatRegistry, Type } from "@sinclair/typebox";
import { SchemaManager } from "../schema-manager";
import "./index";

describe("Simple URL Format", () => {
	const schema = Type.String({ format: "simple-url" });
	const check = FormatRegistry.Get("simple-url") as (value: string) => boolean;

	it("should return true for any string parseable by URL", () => {
		const validUrls = [
			"https://example.com",
			"http://localhost",
			"http://localhost:3000",
			"https://example.com/path",
			"ftp://files.example.com",
			"file:///etc/hosts",
			"mailto:user@example.com",
		];

		for (const url of validUrls) {
			expect(SchemaManager.match(schema, url)).toBe(true);
			expect(check(url)).toBe(true);
		}
	});

	it("should return false for non-parseable URL strings", () => {
		const invalidUrls = [
			"not-a-url",
			"",
			"example.com",
			"://example.com",
			"http:/",
			"   ",
		];

		for (const url of invalidUrls) {
			expect(SchemaManager.match(schema, url)).toBe(false);
			expect(check(url)).toBe(false);
		}
	});
});
