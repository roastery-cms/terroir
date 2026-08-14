import { describe, expect, it } from "bun:test";
import { TooManyRequestsException } from "./too-many-requests.exception";

describe("Too Many Requests Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new TooManyRequestsException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Too Many Requests");
		expect(exception.message).toBe(
			"Too many requests for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new TooManyRequestsException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
