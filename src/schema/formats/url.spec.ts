import { describe, expect, it } from "bun:test";
import { FormatRegistry, Type } from "@sinclair/typebox";
import { Schema } from "../schema";
import "./index";

describe("URL Format", () => {
	const schema = new Schema(Type.String({ format: "url" }));
	const check = FormatRegistry.Get("url") as (value: string) => boolean;

	it("should return true for valid URLs with hostname containing a dot", () => {
		const validUrls = [
			"https://example.com",
			"http://example.com",
			"https://sub.example.com",
			"https://example.com/path",
			"https://example.com:8080",
			"https://example.com/path?query=1",
			"https://example.com/path#anchor",
			"ftp://files.example.com",
			"https://api.example.co.uk",
		];

		for (const url of validUrls) {
			expect(schema.match(url)).toBe(true);
			expect(check(url)).toBe(true);
		}
	});

	it("should return false for invalid URLs or hostnames without a dot", () => {
		const invalidUrls = [
			"not-a-url",
			"http://localhost",
			"https://localhost:3000",
			"example.com",
			"",
			"http://",
			"://example.com",
		];

		for (const url of invalidUrls) {
			expect(schema.match(url)).toBe(false);
			expect(check(url)).toBe(false);
		}
	});
});
