import { describe, expect, it } from "bun:test";
import { HttpVersionNotSupportedException } from "./http-version-not-supported.exception";

describe("HTTP Version Not Supported Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new HttpVersionNotSupportedException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("HTTP Version Not Supported");
		expect(exception.message).toBe(
			"HTTP version not supported by the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new HttpVersionNotSupportedException(
			"User",
			"Custom error",
		);
		expect(exception.message).toBe("Custom error");
	});
});
