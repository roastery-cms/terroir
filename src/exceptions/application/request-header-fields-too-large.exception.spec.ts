import { describe, expect, it } from "bun:test";
import { RequestHeaderFieldsTooLargeException } from "./request-header-fields-too-large.exception";

describe("Request Header Fields Too Large Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new RequestHeaderFieldsTooLargeException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Request Header Fields Too Large");
		expect(exception.message).toBe(
			"Request header fields too large for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new RequestHeaderFieldsTooLargeException(
			"User",
			"Custom error",
		);
		expect(exception.message).toBe("Custom error");
	});
});
