import { describe, expect, it } from "bun:test";
import { ExpectationFailedException } from "./expectation-failed.exception";

describe("Expectation Failed Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new ExpectationFailedException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Expectation Failed");
		expect(exception.message).toBe(
			"Expectation failed for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new ExpectationFailedException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
