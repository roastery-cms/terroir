import { describe, expect, it } from "bun:test";
import { InvalidObjectValueException } from "./invalid-object-value.exception";

describe("Invalid Object Value Exception", () => {
    it("should create an instance with default message", () => {
        const exception = new InvalidObjectValueException("Email");
        expect(exception).toBeInstanceOf(Error);
        expect(exception.name).toBe("Invalid Object Value");
        expect(exception.message).toBe(
            "Invalid value provided for the Email object value.",
        );
        expect(exception.objectValueName).toBe("Email");
    });

    it("should create an instance with custom message", () => {
        const exception = new InvalidObjectValueException(
            "Email",
            "Custom error",
        );
        expect(exception.message).toBe("Custom error");
    });
});
