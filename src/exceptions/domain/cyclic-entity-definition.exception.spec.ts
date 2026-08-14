import { describe, expect, it } from "bun:test";
import { CyclicEntityDefinitionException } from "./cyclic-entity-definition.exception";

describe("Cyclic Entity Definition Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new CyclicEntityDefinitionException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Cyclic Entity Definition");
		expect(exception.message).toBe(
			"The blueprint of User references itself, directly or indirectly.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new CyclicEntityDefinitionException(
			"User",
			"Custom error",
		);
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new CyclicEntityDefinitionException("User", undefined, {
			cause: original,
		});
		expect(exception.cause).toBe(original);
	});
});
