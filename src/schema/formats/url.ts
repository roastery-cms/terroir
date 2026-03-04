import { FormatRegistry } from "@sinclair/typebox";

FormatRegistry.Set("url", (value) => {
	try {
		const url = new URL(value);
		return url.hostname.includes(".");
	} catch {
		return false;
	}
});
