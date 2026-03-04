import { describe, expect, it } from "bun:test";
import { InvalidJWTException } from "./invalid-jwt.exception";

describe("InvalidJWT Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new InvalidJWTException("Application");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Invalid JWT");
		expect(exception.message).toBe(
			"Invalid JWT for the Application application.",
		);
		expect(exception.source).toBe("Application");
	});

	it("should create an instance with custom message", () => {
		const exception = new InvalidJWTException("Application", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
