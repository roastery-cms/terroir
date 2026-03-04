import { describe, expect, it } from "bun:test";
import { InvalidDomainDataException } from "./invalid-domain-data.exception";

describe("Invalid Domain Data Exception", () => {
    it("should create an instance with default message", () => {
        const exception = new InvalidDomainDataException("User");
        expect(exception).toBeInstanceOf(Error);
        expect(exception.name).toBe("Invalid Domain Data");
        expect(exception.message).toBe(
            "Invalid data provided for the User domain.",
        );
        expect(exception.source).toBe("User");
    });

    it("should create an instance with custom message", () => {
        const exception = new InvalidDomainDataException(
            "User",
            "Custom error",
        );
        expect(exception.message).toBe("Custom error");
    });
});
