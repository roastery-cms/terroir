import { describe, expect, it } from "bun:test";
import { NetworkAuthenticationRequiredException } from "./network-authentication-required.exception";

describe("Network Authentication Required Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new NetworkAuthenticationRequiredException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Network Authentication Required");
		expect(exception.message).toBe(
			"Network authentication required for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new NetworkAuthenticationRequiredException(
			"User",
			"Custom error",
		);
		expect(exception.message).toBe("Custom error");
	});
});
