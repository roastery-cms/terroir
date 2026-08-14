import { describe, expect, it } from "bun:test";
import { RequestTimeoutException } from "./request-timeout.exception";

describe("Request Timeout Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new RequestTimeoutException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Request Timeout");
		expect(exception.message).toBe(
			"Request timed out for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new RequestTimeoutException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
