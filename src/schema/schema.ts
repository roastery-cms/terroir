import type { TSchema, Static } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { TypeCompiler, type TypeCheck } from "@sinclair/typebox/compiler";
import "./formats";

export class Schema<SchemaType extends TSchema> {
	private compiledSchema: TypeCheck<TSchema>;

	constructor(private schema: SchemaType) {
		this.compiledSchema = TypeCompiler.Compile(this.schema);
	}

	static make<SchemaType extends TSchema>(
		schema: SchemaType,
	): Schema<SchemaType> {
		return new Schema(schema);
	}

	public match(content: unknown): boolean {
		return this.compiledSchema.Check(content);
	}

	public map(content: unknown): Static<SchemaType> {
		return Value.Clean(
			this.schema,
			Value.Cast(this.schema, Value.Convert(this.schema, content)),
		);
	}

	public toString(): string {
		return JSON.stringify(this.schema);
	}

	public toJSON(): typeof this.schema {
		return this.schema;
	}
}
