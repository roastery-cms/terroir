import { describe, expect, it } from "bun:test";
import { LengthRequiredException } from "./length-required.exception";

describe("Length Required Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new LengthRequiredException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Length Required");
		expect(exception.message).toBe(
			"Content length required for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new LengthRequiredException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
