import { describe, expect, it } from "bun:test";
import { ExternalServiceUnavailableException } from "./external-service-unavailable.exception";

describe("External Service Unavailable Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new ExternalServiceUnavailableException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("External Service Unavailable Exception");
		expect(exception.message).toBe(
			"The User external service is currently unavailable.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new ExternalServiceUnavailableException(
			"User",
			"Custom error",
		);
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new ExternalServiceUnavailableException(
			"User",
			undefined,
			{
				cause: original,
			},
		);
		expect(exception.cause).toBe(original);
	});
});
