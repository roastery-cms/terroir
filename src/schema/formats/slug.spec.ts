import { describe, expect, it } from "bun:test";
import { Type } from "@sinclair/typebox";
import { Schema } from "../schema";
import "./index";

describe("Slug Format", () => {
	const schema = new Schema(Type.String({ format: "slug" }));

	it("should return true for valid slugs", () => {
		const validSlugs = [
			"hello",
			"hello-world",
			"my-blog-post-123",
			"product-1",
			"abc",
			"123",
			"a-b-c-d",
			"roastery-cms",
		];

		for (const slug of validSlugs) {
			expect(schema.match(slug)).toBe(true);
		}
	});

	it("should return false for invalid slugs", () => {
		const invalidSlugs = [
			"Hello",
			"hello_world",
			"hello world",
			"-hello",
			"hello-",
			"hello--world",
			"",
			"olá-mundo",
			"hello.world",
			"hello/world",
			"HELLO-WORLD",
		];

		for (const slug of invalidSlugs) {
			expect(schema.match(slug)).toBe(false);
		}
	});
});
