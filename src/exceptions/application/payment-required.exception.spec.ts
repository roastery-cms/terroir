import { describe, expect, it } from "bun:test";
import { PaymentRequiredException } from "./payment-required.exception";

describe("Payment Required Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new PaymentRequiredException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Payment Required");
		expect(exception.message).toBe(
			"Payment required for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new PaymentRequiredException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
