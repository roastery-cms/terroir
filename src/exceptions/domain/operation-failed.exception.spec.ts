import { describe, it, expect } from "bun:test";
import { OperationFailedException } from "./operation-failed.exception";

describe("OperationFailedException", () => {
	it("should create an instance with default message", () => {
		const exception = new OperationFailedException("TestDomain");
		expect(exception).toBeInstanceOf(OperationFailedException);
		expect(exception.message).toBe(
			"Operation failed in the TestDomain domain.",
		);
		expect(exception.name).toBe("Operation Failed");
		expect(exception.source).toBe("TestDomain");
	});

	it("should create an instance with custom message", () => {
		const exception = new OperationFailedException(
			"TestDomain",
			"Custom message",
		);
		expect(exception.message).toBe("Custom message");
	});
});
