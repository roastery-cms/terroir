import { FormatRegistry } from "@sinclair/typebox";

FormatRegistry.Set("date-time", (value) => {
	return !Number.isNaN(Date.parse(value));
});
