import { describe, expect, it } from "bun:test";
import { UnexpectedCacheValueException } from "./unexpected-cache-value.exception";

describe("Unexpected Cache Value Exception", () => {
    it("should create an instance with default message", () => {
        const key = "user_session_123";
        const layerName = "RedisCache";
        const exception = new UnexpectedCacheValueException(key, layerName);

        expect(exception).toBeInstanceOf(Error);
        expect(exception.name).toBe("Unexpected Cache Value Exception");
        expect(exception.message).toBe(
            `The value from cache for key '${key}' was unexpected.`,
        );
        expect(exception.key).toBe(key);
        expect(exception.source).toBe(layerName);
    });

    it("should create an instance with custom message", () => {
        const key = "config_flags";
        const layerName = "Memcached";
        const customMessage = "Cache value schema mismatch";
        const exception = new UnexpectedCacheValueException(
            key,
            layerName,
            customMessage,
        );

        expect(exception.message).toBe(customMessage);
        expect(exception.key).toBe(key);
        expect(exception.source).toBe(layerName);
    });
});
