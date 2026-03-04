import { describe, expect, it } from "bun:test";
import { CacheUnavailableException } from "./cache-unavailable.exception";

describe("Cache Unavailable Exception", () => {
    it("should create an instance with default message", () => {
        const exception = new CacheUnavailableException("Redis");
        expect(exception).toBeInstanceOf(Error);
        expect(exception.name).toBe("Cache Unavailable Exception");
        expect(exception.message).toBe("The cache is currently unavailable.");
        expect(exception.source).toBe("Redis");
    });

    it("should create an instance with custom message", () => {
        const exception = new CacheUnavailableException(
            "Redis",
            "Connection refused",
        );
        expect(exception.message).toBe("Connection refused");
    });
});
