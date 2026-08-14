import { describe, expect, it } from "bun:test";
import { VariantAlsoNegotiatesException } from "./variant-also-negotiates.exception";

describe("Variant Also Negotiates Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new VariantAlsoNegotiatesException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Variant Also Negotiates");
		expect(exception.message).toBe(
			"Variant also negotiates in the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new VariantAlsoNegotiatesException(
			"User",
			"Custom error",
		);
		expect(exception.message).toBe("Custom error");
	});
});
