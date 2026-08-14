import { describe, expect, it } from "bun:test";
import { FailedDependencyException } from "./failed-dependency.exception";

describe("Failed Dependency Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new FailedDependencyException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Failed Dependency");
		expect(exception.message).toBe(
			"A dependent request failed for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new FailedDependencyException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
