import { describe, expect, it } from "bun:test";
import { UnsupportedMediaTypeException } from "./unsupported-media-type.exception";

describe("Unsupported Media Type Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new UnsupportedMediaTypeException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Unsupported Media Type");
		expect(exception.message).toBe(
			"Unsupported media type for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new UnsupportedMediaTypeException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
