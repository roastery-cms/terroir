import { describe, expect, it } from "bun:test";
import { FormatRegistry, Type } from "@sinclair/typebox";
import { Schema } from "../schema";
import "./index";

describe("Simple URL Format", () => {
	const schema = new Schema(Type.String({ format: "simple-url" }));
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
			expect(schema.match(url)).toBe(true);
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
			expect(schema.match(url)).toBe(false);
			expect(check(url)).toBe(false);
		}
	});
});
