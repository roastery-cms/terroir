import { FormatRegistry } from "@sinclair/typebox";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

FormatRegistry.Set("slug", (value) => slugPattern.test(value));
