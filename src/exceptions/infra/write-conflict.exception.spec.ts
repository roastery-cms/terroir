import { describe, expect, it } from "bun:test";
import { WriteConflictException } from "./write-conflict.exception";

describe("Write Conflict Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new WriteConflictException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Write Conflict Exception");
		expect(exception.message).toBe(
			"A concurrent write conflict was detected in User.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new WriteConflictException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new WriteConflictException("User", undefined, {
			cause: original,
		});
		expect(exception.cause).toBe(original);
	});
});
