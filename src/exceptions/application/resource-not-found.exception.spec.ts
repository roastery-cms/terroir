import { describe, expect, it } from "bun:test";
import { ResourceNotFoundException } from "./resource-not-found.exception";

describe("Resource Not Found Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new ResourceNotFoundException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Resource Not Found");
		expect(exception.message).toBe("Resource not found in the User domain.");
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new ResourceNotFoundException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
