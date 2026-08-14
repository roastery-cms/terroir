import { describe, expect, it } from "bun:test";
import { IncompleteIdentityException } from "./incomplete-identity.exception";

describe("Incomplete Identity Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new IncompleteIdentityException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Incomplete Identity");
		expect(exception.message).toBe("The identity of User is incomplete.");
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new IncompleteIdentityException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new IncompleteIdentityException("User", undefined, {
			cause: original,
		});
		expect(exception.cause).toBe(original);
	});
});
