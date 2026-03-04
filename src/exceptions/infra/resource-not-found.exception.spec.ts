import { describe, expect, it } from "bun:test";
import { ResourceNotFoundException } from "./resource-not-found.exception";

describe("Resource Not Found Exception (Infra)", () => {
	it("should create an instance with default message", () => {
		const exception = new ResourceNotFoundException("PostgreSQL");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Resource Not Found Exception");
		expect(exception.message).toBe("The resource was not found.");
		expect(exception.source).toBe("PostgreSQL");
	});

	it("should create an instance with custom message", () => {
		const exception = new ResourceNotFoundException(
			"PostgreSQL",
			"User not found",
		);
		expect(exception.message).toBe("User not found");
	});
});
