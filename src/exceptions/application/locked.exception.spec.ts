import { describe, expect, it } from "bun:test";
import { LockedException } from "./locked.exception";

describe("Locked Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new LockedException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Locked");
		expect(exception.message).toBe(
			"Resource is locked in the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new LockedException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
