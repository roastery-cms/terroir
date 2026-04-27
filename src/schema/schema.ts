import type { TSchema, Static } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { TypeCompiler, type TypeCheck } from "@sinclair/typebox/compiler";
import "./formats";

/**
 * High-level wrapper around a {@link TSchema | TypeBox schema} that compiles
 * the schema once and exposes ergonomic `match` / `map` / serialization
 * helpers built on top of the compiled validator.
 *
 * @typeParam SchemaType - The exact {@link TSchema} the instance wraps.
 *   Preserving the concrete type allows {@link Schema.map} to return the
 *   inferred {@link Static} representation rather than a widened type.
 *
 * @remarks
 * Importing this module also imports `./formats` for its side-effect, which
 * registers every custom TypeBox format used across the package.
 *
 * @example
 * ```ts
 * import { Schema } from "@roastery/terroir/schema";
 * import { t } from "@roastery/terroir";
 *
 * const userSchema = Schema.make(
 *   t.Object({
 *     id: t.String({ format: "uuid" }),
 *     email: t.String({ format: "email" }),
 *   }),
 * );
 *
 * userSchema.match({ id: "...", email: "alan@example.com" }); // → boolean
 * const safe = userSchema.map(rawInput); // → typed, casted, cleaned
 * const wire = userSchema.toString();    // → JSON-serialised schema
 * ```
 *
 * @see {@link SchemaManager} — builds {@link Schema} instances from JSON strings.
 * @see {@link hydrateSchema}
 */
export class Schema<SchemaType extends TSchema> {
	/** Pre-compiled validator used by {@link Schema.match} for fast checks. */
	private compiledSchema: TypeCheck<TSchema>;

	/**
	 * Wraps a TypeBox schema, eagerly compiling it via
	 * {@link TypeCompiler.Compile} so subsequent `match` calls are O(1) on
	 * the schema and avoid re-walking it on every check.
	 *
	 * @param schema - The TypeBox schema to wrap and compile.
	 */
	constructor(private schema: SchemaType) {
		this.compiledSchema = TypeCompiler.Compile(this.schema);
	}

	/**
	 * Convenience factory that returns a new {@link Schema} for the given
	 * TypeBox schema.
	 *
	 * Functionally equivalent to `new Schema(schema)`, but written as a
	 * static method so call sites read nicely (`Schema.make(...)`) and so
	 * generic inference works without the `new` keyword.
	 *
	 * @typeParam SchemaType - Inferred from the argument.
	 * @param schema - The TypeBox schema to wrap.
	 * @returns A new compiled {@link Schema} wrapping `schema`.
	 */
	static make<SchemaType extends TSchema>(
		schema: SchemaType,
	): Schema<SchemaType> {
		return new Schema(schema);
	}

	/**
	 * Checks whether `content` matches the wrapped schema.
	 *
	 * @param content - Arbitrary value to validate.
	 * @returns `true` if `content` satisfies every constraint of the schema,
	 *   `false` otherwise.
	 */
	public match(content: unknown): boolean {
		return this.compiledSchema.Check(content);
	}

	/**
	 * Coerces `content` into the {@link Static} representation of the schema
	 * via TypeBox's `Convert → Cast → Clean` pipeline:
	 *
	 * 1. `Value.Convert` — coerces compatible primitives (string ⇄ number,
	 *    string ⇄ boolean, …) when possible.
	 * 2. `Value.Cast` — fills in missing fields with their schema defaults
	 *    and casts the structure to the schema's shape.
	 * 3. `Value.Clean` — strips properties that the schema does not
	 *    declare, returning a value with exactly the expected surface.
	 *
	 * @param content - Arbitrary value to coerce.
	 * @returns The coerced value, typed as {@link Static}<{@link SchemaType}>.
	 *
	 * @throws Propagates the underlying TypeBox error if `content` cannot be
	 *   cast to the schema (for example, when a required field has no
	 *   default and is missing).
	 */
	public map(content: unknown): Static<SchemaType> {
		return Value.Clean(
			this.schema,
			Value.Cast(this.schema, Value.Convert(this.schema, content)),
		);
	}

	/**
	 * @returns The wrapped schema serialised as a JSON string. Symbols (the
	 *   `[Kind]` tag in particular) are stripped — re-hydrate the resulting
	 *   string with {@link SchemaManager.build} or {@link hydrateSchema}.
	 */
	public toString(): string {
		return JSON.stringify(this.schema);
	}

	/**
	 * @returns The original (uncompiled) TypeBox schema. Used by
	 *   `JSON.stringify` to plug the schema into structured data.
	 */
	public toJSON(): typeof this.schema {
		return this.schema;
	}
}
