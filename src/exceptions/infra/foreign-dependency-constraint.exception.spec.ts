import { describe, expect, it } from "bun:test";
import { ForeignDependencyConstraintException } from "./foreign-dependency-constraint.exception";

describe("Foreign Dependency Constraint Exception", () => {
    it("should create an instance with default message", () => {
        const layerName = "PostgreSQL";
        const exception = new ForeignDependencyConstraintException(layerName);

        expect(exception).toBeInstanceOf(Error);
        expect(exception).toBeInstanceOf(ForeignDependencyConstraintException);
        expect(exception.name).toBe("Foreign Dependency Constraint Exception");
        expect(exception.message).toBe(
            `It was not possible to remove the ${layerName} resource due to its usefulness in other domains.`,
        );
        expect(exception.source).toBe(layerName);
    });

    it("should create an instance with custom message", () => {
        const customMessage = "Custom error message";
        const exception = new ForeignDependencyConstraintException(
            "PostgreSQL",
            customMessage,
        );

        expect(exception.message).toBe(customMessage);
        expect(exception.source).toBe("PostgreSQL");
    });
});
