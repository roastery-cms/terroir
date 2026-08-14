import { describe, expect, it } from "bun:test";
import { UnknownException } from "./unknown.exception";

describe("Unknown Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new UnknownException();
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Unknown Error");
		expect(exception.message).toBe("An unknown error has occurred.");
	});

	it("should create an instance with custom message", () => {
		const exception = new UnknownException("Custom error");
		expect(exception.message).toBe("Custom error");
	});

	it("should keep the original error in cause", () => {
		const original = new Error("root cause");
		const exception = new UnknownException(undefined, { cause: original });
		expect(exception.cause).toBe(original);
	});
});
