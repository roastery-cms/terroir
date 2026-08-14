import { describe, expect, it } from "bun:test";
import { NotImplementedException } from "./not-implemented.exception";

describe("Not Implemented Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new NotImplementedException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Not Implemented");
		expect(exception.message).toBe(
			"Operation not implemented in the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new NotImplementedException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
