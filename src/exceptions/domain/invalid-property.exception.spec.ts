import { describe, expect, it } from "bun:test";
import { InvalidPropertyException } from "./invalid-property.exception";
import { ExceptionLayer } from "@/exceptions/symbols";

describe("InvalidPropertyException", () => {
    it("should return the correct name", () => {
        const exception = new InvalidPropertyException("email", "User");
        expect(exception.name).toBe("Invalid Property");
    });

    it("should return the correct message", () => {
        const exception = new InvalidPropertyException("email", "User");
        expect(exception.message).toBe(
            "The property 'email' in User is invalid.",
        );
    });

    it("should return the correct default message", () => {
        const exception = new InvalidPropertyException("email", "User");
        expect(exception.message).toBe(
            "The property 'email' in User is invalid.",
        );
    });

    it("should return the correct message when a custom message is provided", () => {
        const exception = new InvalidPropertyException(
            "email",
            "User",
            "Custom message",
        );
        expect(exception.message).toBe("Custom message");
    });

    it("should return the correct layer", () => {
        const exception = new InvalidPropertyException("email", "User");
        expect(exception[ExceptionLayer]).toBe("domain");
    });

    it("should return the correct property", () => {
        const exception = new InvalidPropertyException("email", "User");
        expect(exception.property).toBe("email");
    });
});
