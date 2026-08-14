import { describe, expect, it } from "bun:test";
import { NotAcceptableException } from "./not-acceptable.exception";

describe("Not Acceptable Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new NotAcceptableException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Not Acceptable");
		expect(exception.message).toBe(
			"No acceptable representation available for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new NotAcceptableException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
