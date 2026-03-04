import { TypeCompiler } from "@sinclair/typebox/compiler";
import { Schema } from "./schema";
import { hydrateSchema } from "@/schema/utils/hydrate-schema";
import type { TSchema } from "@sinclair/typebox";

export const SchemaManager = {
    build<SchemaType extends TSchema>(schema: string): Schema<SchemaType> {
        const parsedSchema = JSON.parse(schema);
        const hydrated = hydrateSchema(parsedSchema);

        return new Schema(hydrated);
    },

    isSchema(schema: unknown): boolean {
        try {
            if (typeof schema === "string") schema = JSON.parse(schema);

            const hydrated = hydrateSchema(schema);
            TypeCompiler.Compile(hydrated as never);

            return true;
        } catch (_) {
            return false;
        }
    },
};
