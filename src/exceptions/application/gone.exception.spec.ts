import { describe, expect, it } from "bun:test";
import { GoneException } from "./gone.exception";

describe("Gone Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new GoneException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Gone");
		expect(exception.message).toBe(
			"Resource is no longer available in the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new GoneException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
