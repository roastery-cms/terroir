import { describe, expect, it } from "bun:test";
import { UnprocessableContentException } from "./unprocessable-content.exception";

describe("Unprocessable Content Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new UnprocessableContentException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Unprocessable Content");
		expect(exception.message).toBe(
			"Unprocessable content for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new UnprocessableContentException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
