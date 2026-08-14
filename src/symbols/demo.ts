/**
 * Sentinel for demo-mode construction, shared by the `ValueObject` and
 * `Entity` bases in `@roastery/beans`: the `demo()` statics pass it through
 * the regular constructor channel, and the constructor recognises it and swaps
 * it for the class's declared defaults.
 *
 * @remarks
 * The symbol is the only thing that turns a constructor call into demo mode.
 * While it lived inside `@roastery/beans` it was kept out of that package's
 * barrel, so external callers structurally could not reach it; across a
 * package boundary that guarantee is gone — only barrels are published, so a
 * symbol that is not exported is a symbol nothing can use. Entering demo mode
 * through the public `demo()` statics is now a convention rather than
 * something the module system enforces.
 *
 * Passing this symbol to a constructor directly bypasses validation of the
 * value it stands in for. Treat it as an implementation detail of `demo()`.
 *
 * @see `ValueObject.demo()` / `Entity.demo()` in `@roastery/beans` — the
 *   intended way in.
 */
export const Demo = Symbol("demo");
