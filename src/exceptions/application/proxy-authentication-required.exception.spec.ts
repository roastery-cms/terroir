import { describe, expect, it } from "bun:test";
import { ProxyAuthenticationRequiredException } from "./proxy-authentication-required.exception";

describe("Proxy Authentication Required Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new ProxyAuthenticationRequiredException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Proxy Authentication Required");
		expect(exception.message).toBe(
			"Proxy authentication required for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new ProxyAuthenticationRequiredException(
			"User",
			"Custom error",
		);
		expect(exception.message).toBe("Custom error");
	});
});
