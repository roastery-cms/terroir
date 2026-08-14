import { describe, expect, it } from "bun:test";
import { GatewayTimeoutException } from "./gateway-timeout.exception";

describe("Gateway Timeout Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new GatewayTimeoutException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Gateway Timeout");
		expect(exception.message).toBe(
			"Gateway timed out for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new GatewayTimeoutException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
