import { describe, expect, it } from "bun:test";
import { MigrationFailedException } from "./migration-failed.exception";

describe("Migration Failed Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new MigrationFailedException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Migration Failed Exception");
		expect(exception.message).toBe(
			"The database migration for User could not be applied.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new MigrationFailedException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new MigrationFailedException("User", undefined, {
			cause: original,
		});
		expect(exception.cause).toBe(original);
	});
});
