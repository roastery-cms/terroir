import { FormatRegistry } from "@sinclair/typebox";
import { validate, version } from "uuid";

FormatRegistry.Set("uuid", (value) => validate(value) && version(value) === 7);
