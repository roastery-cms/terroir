import { describe, expect, it } from "bun:test";
import { OperationNotAllowedException } from "./operation-not-allowed.exception";

describe("Operation Not Allowed Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new OperationNotAllowedException("Redis");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Operation Not Allowed Exception");
		expect(exception.message).toBe("The operation is not allowed.");
		expect(exception.source).toBe("Redis");
	});

	it("should create an instance with custom message", () => {
		const exception = new OperationNotAllowedException(
			"Redis",
			"Write operation failed",
		);
		expect(exception.message).toBe("Write operation failed");
	});
});
