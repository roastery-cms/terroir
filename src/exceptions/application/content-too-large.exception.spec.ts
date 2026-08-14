import { describe, expect, it } from "bun:test";
import { ContentTooLargeException } from "./content-too-large.exception";

describe("Content Too Large Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new ContentTooLargeException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Content Too Large");
		expect(exception.message).toBe(
			"Content too large for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new ContentTooLargeException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
