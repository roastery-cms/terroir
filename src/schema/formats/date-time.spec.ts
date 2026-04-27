import { describe, expect, it } from "bun:test";
import { Type } from "@sinclair/typebox";
import { Schema } from "../schema";
import "./index";

describe("Date-Time Format", () => {
	const schema = new Schema(Type.String({ format: "date-time" }));

	it("should return true for valid date-time strings", () => {
		const validDateTimes = [
			"2024-01-15T10:30:00Z",
			"2024-01-15T10:30:00.123Z",
			"2024-01-15T10:30:00+02:00",
			"2024-01-15T10:30:00-05:00",
			"2024-12-31T23:59:59Z",
			"2024-01-15",
			new Date().toISOString(),
		];

		for (const dateTime of validDateTimes) {
			expect(schema.match(dateTime)).toBe(true);
		}
	});

	it("should return false for invalid date-time strings", () => {
		const invalidDateTimes = [
			"not-a-date",
			"2024-13-01T10:30:00Z",
			"2024-01-32T10:30:00Z",
			"abc",
			"",
			"24:00:00",
		];

		for (const dateTime of invalidDateTimes) {
			expect(schema.match(dateTime)).toBe(false);
		}
	});
});
