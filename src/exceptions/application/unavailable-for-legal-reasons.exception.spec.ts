import { describe, expect, it } from "bun:test";
import { UnavailableForLegalReasonsException } from "./unavailable-for-legal-reasons.exception";

describe("Unavailable For Legal Reasons Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new UnavailableForLegalReasonsException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Unavailable For Legal Reasons");
		expect(exception.message).toBe(
			"Resource unavailable for legal reasons in the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new UnavailableForLegalReasonsException(
			"User",
			"Custom error",
		);
		expect(exception.message).toBe("Custom error");
	});
});
