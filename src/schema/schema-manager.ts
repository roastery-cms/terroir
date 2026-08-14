import type { TSchema } from "@sinclair/typebox";
import { TypeCompiler, type TypeCheck } from "@sinclair/typebox/compiler";
import { hydrateSchema } from "@/schema/utils/hydrate-schema";
import "./formats";

/**
 * Compiled-validator cache, keyed by the schema object itself.
 *
 * {@link TypeCompiler.Compile} walks the whole schema tree and generates a
 * checking function, which is expensive enough that repeating it on every
 * {@link SchemaManager.match} call would dominate the cost of validating. A
 * `WeakMap` keeps the compiled validator alive exactly as long as the schema
 * it belongs to, so long-lived schemas are compiled once and short-lived ones
 * are collected with their entry.
 *
 * @remarks
 * The cache is keyed by identity, not by structure: two structurally identical
 * schema objects compile twice. Conversely, mutating a schema after it has
 * been compiled leaves the stale validator in place — treat schemas as
 * immutable once they reach this module.
 */
const compiledSchemas = new WeakMap<TSchema, TypeCheck<TSchema>>();

/**
 * Static helper for working with {@link TSchema | TypeBox schemas} that cross
 * a serialization boundary — schemas stored in a database, sent over the
 * wire, or persisted in configuration.
 *
 * Schemas stay plain TypeBox values throughout: every method takes and
 * returns a `TSchema`, so consumers keep full access to TypeBox's own API
 * (`Value.Check`, `Value.Convert`, `Static<typeof schema>`, …) instead of
 * unwrapping a bespoke container first.
 *
 * TypeBox identifies each schema node through a non-enumerable `[Kind]`
 * symbol. JSON serialization strips that symbol; `SchemaManager` re-attaches
 * it through {@link hydrateSchema} before handing the payload to
 * {@link TypeCompiler.Compile}.
 *
 * @remarks
 * Importing this module also imports `./formats` for its side-effect, which
 * registers every custom TypeBox format used across the package.
 *
 * @example
 * ```ts
 * import { SchemaManager } from "@roastery/terroir/schema";
 * import { t } from "@roastery/terroir";
 * import type { TObject } from "@sinclair/typebox";
 *
 * // 1) Producer side: serialize a schema.
 * const wire = SchemaManager.serialize(t.Object({ name: t.String() }));
 *
 * // 2) Consumer side: rebuild a usable TypeBox schema.
 * const schema = SchemaManager.build<TObject>(wire);
 * SchemaManager.match(schema, { name: "Alan" }); // → true
 *
 * // 3) Validate an unknown payload before trusting it.
 * SchemaManager.isSchema(wire);                 // → true
 * SchemaManager.isSchema('{"type":"banana"}');  // → false
 * ```
 *
 * @see {@link hydrateSchema}
 */
export class SchemaManager {
	/** Not instantiable — every member is static. */
	private constructor() {}

	/**
	 * Returns the compiled validator for `schema`, compiling and caching it on
	 * first use.
	 *
	 * @param schema - The schema to compile.
	 * @returns The cached {@link TypeCheck} for `schema`.
	 */
	private static compile(schema: TSchema): TypeCheck<TSchema> {
		const cached = compiledSchemas.get(schema);
		if (cached) return cached;

		const compiled = TypeCompiler.Compile(schema);
		compiledSchemas.set(schema, compiled);

		return compiled;
	}

	/**
	 * Parses a JSON-serialized TypeBox schema, re-hydrates it with
	 * {@link hydrateSchema}, and returns it as a usable TypeBox schema.
	 *
	 * The result is compiled eagerly — so an invalid payload fails here rather
	 * than at the first validation — and the compiled validator is cached, so
	 * the first {@link SchemaManager.match} on the returned schema costs
	 * nothing extra.
	 *
	 * @typeParam SchemaType - The {@link TSchema} the wire payload represents.
	 *   The caller specifies it explicitly (or via inference from a type
	 *   annotation) — `JSON.parse` cannot recover it on its own.
	 * @param schema - JSON string produced by {@link SchemaManager.serialize}
	 *   or `JSON.stringify(<TSchema>)`.
	 * @returns The hydrated schema, typed as `SchemaType`.
	 *
	 * @throws {SyntaxError} If `schema` is not valid JSON.
	 * @throws Propagates errors from {@link TypeCompiler.Compile} when the
	 *   hydrated payload is not a valid TypeBox schema.
	 */
	static build<SchemaType extends TSchema>(schema: string): SchemaType {
		const hydrated = hydrateSchema(JSON.parse(schema)) as SchemaType;

		SchemaManager.compile(hydrated);

		return hydrated;
	}

	/**
	 * Serializes a schema to a JSON string.
	 *
	 * Symbols (the `[Kind]` tag in particular) are stripped by
	 * `JSON.stringify` — re-hydrate the resulting string with
	 * {@link SchemaManager.build}.
	 *
	 * @param schema - The schema to serialize.
	 * @returns The schema as a JSON string.
	 */
	static serialize(schema: TSchema): string {
		return JSON.stringify(schema);
	}

	/**
	 * Checks whether `content` matches `schema`, using the compiled validator
	 * (compiling and caching it on first use).
	 *
	 * @param schema - The schema to validate against.
	 * @param content - Arbitrary value to validate.
	 * @returns `true` if `content` satisfies every constraint of `schema`,
	 *   `false` otherwise.
	 *
	 * @throws Propagates errors from {@link TypeCompiler.Compile} the first
	 *   time an invalid schema is passed.
	 */
	static match(schema: TSchema, content: unknown): boolean {
		return SchemaManager.compile(schema).Check(content);
	}

	/**
	 * Validates that the given value can be hydrated and compiled as a
	 * TypeBox schema. Accepts either a JSON string or an already-parsed
	 * object.
	 *
	 * Never throws — any failure (parsing, hydration or compilation) is
	 * caught internally and converted to `false`.
	 *
	 * @param schema - Either a JSON string or a JavaScript object that may
	 *   represent a TypeBox schema.
	 * @returns `true` if the value compiles successfully, `false` otherwise.
	 */
	static isSchema(schema: unknown): boolean {
		try {
			if (typeof schema === "string") schema = JSON.parse(schema);

			TypeCompiler.Compile(hydrateSchema(schema));

			return true;
		} catch (_) {
			return false;
		}
	}
}
