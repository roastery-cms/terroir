import { describe, expect, it } from "bun:test";
import { OptimisticLockException } from "./optimistic-lock.exception";

describe("Optimistic Lock Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new OptimisticLockException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Optimistic Lock Exception");
		expect(exception.message).toBe(
			"The User record changed since it was read.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new OptimisticLockException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new OptimisticLockException("User", undefined, {
			cause: original,
		});
		expect(exception.cause).toBe(original);
	});
});
