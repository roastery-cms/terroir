import { describe, expect, it } from "bun:test";
import { BadGatewayException } from "./bad-gateway.exception";

describe("Bad Gateway Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new BadGatewayException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Bad Gateway");
		expect(exception.message).toBe(
			"Bad gateway response reached the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new BadGatewayException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
