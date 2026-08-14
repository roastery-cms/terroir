import { describe, expect, it } from "bun:test";
import { ImmutablePropertyException } from "./immutable-property.exception";

describe("Immutable Property Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new ImmutablePropertyException("id", "User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Immutable Property");
		expect(exception.message).toBe("The property 'id' in User is immutable.");
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new ImmutablePropertyException(
			"id",
			"User",
			"Custom error",
		);
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new ImmutablePropertyException("id", "User", undefined, {
			cause: original,
		});
		expect(exception.cause).toBe(original);
	});
});
