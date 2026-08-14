import { describe, expect, it } from "bun:test";
import { BadRequestException } from "./bad-request.exception";

describe("Bad Request Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new BadRequestException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Bad Request");
		expect(exception.message).toBe("Bad request for the User application.");
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new BadRequestException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});

	it("should expose the HTTP status it maps to", () => {
		const exception = new BadRequestException("User");
		expect(exception.code).toBe(400);
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new BadRequestException("User", undefined, {
			cause: original,
		});
		expect(exception.cause).toBe(original);
	});
});
