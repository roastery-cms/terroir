import { describe, expect, it } from "bun:test";
import { ConflictException } from "./conflict.exception";

describe("Conflict Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new ConflictException("PostgreSQL");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Conflict Exception");
		expect(exception.message).toBe("A conflict occurred in the database.");
		expect(exception.source).toBe("PostgreSQL");
	});

	it("should create an instance with custom message", () => {
		const exception = new ConflictException(
			"PostgreSQL",
			"Unique constraint failed",
		);
		expect(exception.message).toBe("Unique constraint failed");
	});
});
