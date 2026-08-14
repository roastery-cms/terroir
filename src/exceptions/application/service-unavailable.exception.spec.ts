import { describe, expect, it } from "bun:test";
import { ServiceUnavailableException } from "./service-unavailable.exception";

describe("Service Unavailable Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new ServiceUnavailableException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Service Unavailable");
		expect(exception.message).toBe(
			"Service unavailable for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new ServiceUnavailableException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
