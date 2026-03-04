import { FormatRegistry } from "@sinclair/typebox";

FormatRegistry.Set("simple-url", (value) => {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
});
