import { describe, expect, it } from "bun:test";
import { RangeNotSatisfiableException } from "./range-not-satisfiable.exception";

describe("Range Not Satisfiable Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new RangeNotSatisfiableException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Range Not Satisfiable");
		expect(exception.message).toBe(
			"Requested range not satisfiable for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new RangeNotSatisfiableException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
