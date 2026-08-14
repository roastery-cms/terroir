import { describe, expect, it } from "bun:test";
import { UpgradeRequiredException } from "./upgrade-required.exception";

describe("Upgrade Required Exception", () => {
	it("should create an instance with default message", () => {
		const exception = new UpgradeRequiredException("User");
		expect(exception).toBeInstanceOf(Error);
		expect(exception.name).toBe("Upgrade Required");
		expect(exception.message).toBe(
			"Protocol upgrade required for the User application.",
		);
		expect(exception.source).toBe("User");
	});

	it("should create an instance with custom message", () => {
		const exception = new UpgradeRequiredException("User", "Custom error");
		expect(exception.message).toBe("Custom error");
	});
});
