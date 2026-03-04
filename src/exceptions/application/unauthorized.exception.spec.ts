import { describe, expect, it } from "bun:test";
import { UnauthorizedException } from "./unauthorized.exception";

describe("Unauthorized Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new UnauthorizedException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Unauthorized");
		expect(exception.message).toBe(
			"Unauthorized access to the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new UnauthorizedException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
