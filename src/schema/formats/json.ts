import { FormatRegistry } from "@sinclair/typebox";

FormatRegistry.Set("json", (value) => {
	try {
		JSON.parse(value);
		return true;
	} catch {
		return false;
	}
});
