import { describe, expect, it } from "bun:test";
import { PreconditionFailedException } from "./precondition-failed.exception";

describe("Precondition Failed Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new PreconditionFailedException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Precondition Failed");
		expect(exception.message).toBe(
			"Precondition failed for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new PreconditionFailedException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
