import type { Static, TSchema } from "@sinclair/typebox";

export type ToDTO<SchemaType extends TSchema> = Static<SchemaType>;
