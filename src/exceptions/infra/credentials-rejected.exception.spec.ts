import { describe, expect, it } from "bun:test";
import { CredentialsRejectedException } from "./credentials-rejected.exception";

describe("Credentials Rejected Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new CredentialsRejectedException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Credentials Rejected Exception");
		expect(exception.message).toBe(
			"The credentials presented to User were rejected.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new CredentialsRejectedException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new CredentialsRejectedException("User", undefined, {
			cause: original,
		});
		expect(exception.cause).toBe(original);
	});
});
