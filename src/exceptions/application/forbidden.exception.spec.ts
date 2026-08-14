import { describe, expect, it } from "bun:test";
import { ForbiddenException } from "./forbidden.exception";

describe("Forbidden Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new ForbiddenException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Forbidden");
		expect(exception.message).toBe("Forbidden access to the User application.");
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new ForbiddenException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
