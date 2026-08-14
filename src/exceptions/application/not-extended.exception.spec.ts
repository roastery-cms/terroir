import { describe, expect, it } from "bun:test";
import { NotExtendedException } from "./not-extended.exception";

describe("Not Extended Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new NotExtendedException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Not Extended");
		expect(exception.message).toBe(
			"Further extensions required for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new NotExtendedException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
