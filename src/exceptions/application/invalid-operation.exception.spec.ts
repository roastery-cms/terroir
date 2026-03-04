import { describe, expect, it } from "bun:test";

import { InvalidOperationException } from "./invalid-operation.exception";

describe("Invalid Operation Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new InvalidOperationException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Invalid Operation");
		expect(exception.message).toBe(
			"Invalid operation for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new InvalidOperationException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
