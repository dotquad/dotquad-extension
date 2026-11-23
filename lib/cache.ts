/** Five minutes for lookups, a day for grades. Kept in session storage, cleared when the browser closes. */
export const LOOKUP_TTL_MS = 5 * 60_000;
export const GRADE_TTL_MS = 24 * 60 * 60_000;

interface Entry<T> {
  at: number;
  value: T;
}

/** The storage the cache needs: `browser.storage.session` in the extension, a Map in tests. */
export interface CacheStore {
  get(key: string): Promise<Record<string, unknown>>;
  set(items: Record<string, unknown>): Promise<void>;
}

export const isFresh = (entry: Entry<unknown> | undefined, ttl: number, now: number) =>
  entry !== undefined && now - entry.at < ttl;

/** Returns a cached answer younger than `ttl`, or runs `load` and keeps its answer. Errors aren't kept. */
export function createCache(store: CacheStore, now: () => number = Date.now) {
  return async function cached<T>(key: string, ttl: number, load: () => Promise<T>): Promise<T> {
    const k = `cache:${key}`;
    const entry = (await store.get(k))[k] as Entry<T> | undefined;
    if (entry && isFresh(entry, ttl, now())) return entry.value;
    const value = await load();
    await store.set({ [k]: { at: now(), value } satisfies Entry<T> });
    return value;
  };
}
