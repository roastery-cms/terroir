import { describe, expect, it } from "bun:test";
import { InsufficientStorageException } from "./insufficient-storage.exception";

describe("Insufficient Storage Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new InsufficientStorageException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Insufficient Storage");
		expect(exception.message).toBe(
			"Insufficient storage for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new InsufficientStorageException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
