import { describe, expect, it } from "bun:test";
import { StorageUnavailableException } from "./storage-unavailable.exception";

describe("Storage Unavailable Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new StorageUnavailableException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Storage Unavailable Exception");
		expect(exception.message).toBe(
			"The User object storage is currently unavailable.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new StorageUnavailableException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new StorageUnavailableException("User", undefined, {
			cause: original,
		});
		expect(exception.cause).toBe(original);
	});
});
