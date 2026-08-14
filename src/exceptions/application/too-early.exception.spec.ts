import { describe, expect, it } from "bun:test";
import { TooEarlyException } from "./too-early.exception";

describe("Too Early Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new TooEarlyException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Too Early");
		expect(exception.message).toBe(
			"Request replayed too early for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new TooEarlyException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
