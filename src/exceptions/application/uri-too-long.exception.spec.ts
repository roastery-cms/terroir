import { describe, expect, it } from "bun:test";
import { UriTooLongException } from "./uri-too-long.exception";

describe("URI Too Long Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new UriTooLongException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("URI Too Long");
		expect(exception.message).toBe("URI too long for the User application.");
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new UriTooLongException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
