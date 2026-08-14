import { describe, expect, it } from "bun:test";
import { InternalServerErrorException } from "./internal-server-error.exception";

describe("Internal Server Error Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new InternalServerErrorException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Internal Server Error");
		expect(exception.message).toBe(
			"Internal server error in the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new InternalServerErrorException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
