import { describe, expect, it } from "bun:test";
import { InvalidEntityData } from "./entity-validation.exception";

describe("Invalid Entity Data Exception", () => {
    it("should create an instance with default message", () => {
        const exception = new InvalidEntityData();
        expect(exception).toBeInstanceOf(Error);
        expect(exception.name).toBe("Invalid Entity Data");
        expect(exception.message).toBe("The entity validation failed.");
    });

    it("should create an instance with custom message", () => {
        const exception = new InvalidEntityData("Custom error");
        expect(exception.message).toBe("Custom error");
    });
});
