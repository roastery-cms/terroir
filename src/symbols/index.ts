/**
 * Well-known symbols shared across the Roastery ecosystem.
 *
 * This package declares them and, apart from {@link Layer}, does nothing with
 * them. A symbol is an identity: it must have exactly one declaration site for
 * the code that writes a slot and the code that reads it to agree by
 * reference. Hosting them here is what lets `@roastery/beans` write
 * `this[Storage]` and a consumer read the same slot without either importing
 * the other.
 *
 * The semantics documented on each symbol are implemented by the domain bases
 * in `@roastery/beans`. {@link Layer} is the exception — every exception class
 * in this package declares it.
 *
 * Re-exports:
 * - {@link Context} — identification context (`ValueObject`) / built property map (`Entity`).
 * - {@link Demo} — sentinel that switches a constructor call into demo mode.
 * - {@link Layer} — architectural layer of an exception.
 * - {@link Meta} — schema + demo default of a `ValueObject`.
 * - {@link Properties} — blueprint of an `Entity`.
 * - {@link Source} — entity-type name of an `Entity`.
 * - {@link Storage} — per-instance transient store of an `Entity`.
 *
 * @module @roastery/terroir/symbols
 */
export { Context } from "./context";
export { Demo } from "./demo";
export { Layer } from "./layer";
export { Meta } from "./meta";
export { Properties } from "./properties";
export { Source } from "./source";
export { Storage } from "./storage";
