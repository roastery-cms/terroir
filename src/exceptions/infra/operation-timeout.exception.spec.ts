import { describe, expect, it } from "bun:test";
import { OperationTimeoutException } from "./operation-timeout.exception";

describe("Operation Timeout Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new OperationTimeoutException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Operation Timeout Exception");
		expect(exception.message).toBe(
			"The User operation did not complete within the allotted time.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new OperationTimeoutException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new OperationTimeoutException("User", undefined, {
			cause: original,
		});
		expect(exception.cause).toBe(original);
	});
});
