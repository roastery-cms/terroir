import { describe, expect, it } from "bun:test";
import { ResourceAlreadyExistsException } from "./resource-already-exists.exception";

describe("Resource Already Exists Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new ResourceAlreadyExistsException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Resource Already Exists");
		expect(exception.message).toBe(
			"Resource already exists in the User domain.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new ResourceAlreadyExistsException(
			"User",
			"Custom error",
		);
		expect(exception.message).toBe("Custom error");
	});
});
