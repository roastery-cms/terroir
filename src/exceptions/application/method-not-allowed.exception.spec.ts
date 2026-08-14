import { describe, expect, it } from "bun:test";
import { MethodNotAllowedException } from "./method-not-allowed.exception";

describe("Method Not Allowed Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new MethodNotAllowedException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Method Not Allowed");
		expect(exception.message).toBe(
			"Method not allowed for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new MethodNotAllowedException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
