import { describe, expect, it } from "bun:test";
import { MisdirectedRequestException } from "./misdirected-request.exception";

describe("Misdirected Request Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new MisdirectedRequestException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Misdirected Request");
		expect(exception.message).toBe(
			"Misdirected request for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new MisdirectedRequestException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
