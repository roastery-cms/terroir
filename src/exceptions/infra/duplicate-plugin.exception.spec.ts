import { describe, expect, it } from "bun:test";
import { DuplicatePluginException } from "./duplicate-plugin.exception";

describe("Duplicate Plugin Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new DuplicatePluginException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Duplicate Plugin Exception");
		expect(exception.message).toBe(
			'The "User" plugin was registered more than once.',
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new DuplicatePluginException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new DuplicatePluginException("User", undefined, {
			cause: original,
		});
		expect(exception.cause).toBe(original);
	});
});
