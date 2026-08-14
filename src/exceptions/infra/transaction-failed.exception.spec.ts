import { describe, expect, it } from "bun:test";
import { TransactionFailedException } from "./transaction-failed.exception";

describe("Transaction Failed Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new TransactionFailedException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Transaction Failed Exception");
		expect(exception.message).toBe(
			"The transaction in User could not be completed and was rolled back.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new TransactionFailedException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new TransactionFailedException("User", undefined, {
			cause: original,
		});
		expect(exception.cause).toBe(original);
	});
});
