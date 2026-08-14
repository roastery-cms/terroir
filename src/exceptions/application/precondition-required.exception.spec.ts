import { describe, expect, it } from "bun:test";
import { PreconditionRequiredException } from "./precondition-required.exception";

describe("Precondition Required Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new PreconditionRequiredException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Precondition Required");
		expect(exception.message).toBe(
			"Precondition required for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new PreconditionRequiredException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
