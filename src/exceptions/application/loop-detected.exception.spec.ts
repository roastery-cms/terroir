import { describe, expect, it } from "bun:test";
import { LoopDetectedException } from "./loop-detected.exception";

describe("Loop Detected Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new LoopDetectedException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Loop Detected");
		expect(exception.message).toBe(
			"Infinite loop detected in the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new LoopDetectedException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
