import { describe, expect, it } from "bun:test";
import { PropertyNameCollisionException } from "./property-name-collision.exception";

describe("Property Name Collision Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new PropertyNameCollisionException("schema", "User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Property Name Collision");
		expect(exception.message).toBe(
			"The property 'schema' in User collides with an existing member.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new PropertyNameCollisionException(
			"schema",
			"User",
			"Custom error",
		);
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new PropertyNameCollisionException(
			"schema",
			"User",
			undefined,
			{
				cause: original,
			},
		);
		expect(exception.cause).toBe(original);
	});
});
