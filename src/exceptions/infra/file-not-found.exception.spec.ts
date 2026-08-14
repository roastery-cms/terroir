import { describe, expect, it } from "bun:test";
import { FileNotFoundException } from "./file-not-found.exception";

describe("File Not Found Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new FileNotFoundException(
			"/var/log/roastery.log",
			"User",
		);
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("File Not Found Exception");
		expect(exception.message).toBe(
			"The file '/var/log/roastery.log' was not found by User.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new FileNotFoundException(
			"/var/log/roastery.log",
			"User",
			"Custom error",
		);
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new FileNotFoundException(
			"/var/log/roastery.log",
			"User",
			undefined,
			{
				cause: original,
			},
		);
		expect(exception.cause).toBe(original);
	});
});
