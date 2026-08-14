import { describe, expect, it } from "bun:test";
import { ImATeapotException } from "./im-a-teapot.exception";

describe("I'm a Teapot Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new ImATeapotException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("I'm a Teapot");
		expect(exception.message).toBe(
			"The User application refuses to brew coffee with a teapot.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new ImATeapotException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
