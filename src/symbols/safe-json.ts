/**
 * Symbol keying the redacted event-payload form of a domain object: the same
 * shape as {@link Json}, with every property that must not leave the domain
 * masked or omitted.
 *
 * @remarks
 * The two forms exist because a domain event has two audiences. In-process
 * handlers run inside the trust boundary and read {@link Json}; anything that
 * publishes onto a transport the domain does not control — a message bus, a
 * log sink, an audit trail — reads this slot instead. Keeping the redaction in
 * a slot of its own means the emitter chooses the audience, rather than every
 * call site remembering which fields to strip.
 *
 * Declared here; written and read by the domain bases in `@roastery/beans`.
 *
 * @see {@link Json} — the complete form this one redacts.
 */
export const SafeJson = Symbol("safe-json");
