import { describe, expect, it } from "bun:test";
import { FileWriteFailedException } from "./file-write-failed.exception";

describe("File Write Failed Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new FileWriteFailedException(
			"/var/log/roastery.log",
			"User",
		);
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("File Write Failed Exception");
		expect(exception.message).toBe(
			"Writing to '/var/log/roastery.log' failed in User.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new FileWriteFailedException(
			"/var/log/roastery.log",
			"User",
			"Custom error",
		);
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new FileWriteFailedException(
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
