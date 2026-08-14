import { describe, expect, it } from "bun:test";
import { DependencyNotWiredException } from "./dependency-not-wired.exception";

describe("Dependency Not Wired Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new DependencyNotWiredException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Dependency Not Wired Exception");
		expect(exception.message).toBe(
			"The User dependency was not provided during composition.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new DependencyNotWiredException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new DependencyNotWiredException("User", undefined, {
			cause: original,
		});
		expect(exception.cause).toBe(original);
	});
});
