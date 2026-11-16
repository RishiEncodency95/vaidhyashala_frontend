/**
 * Page content (from the admin) already loaded in this browser tab.
 * A page opened again shows it straight away while a fresh copy loads in the background, and
 * `loadContent` never sends two requests for the same page at once (e.g. the background prefetch
 * and the page itself).
 */
import { useSyncExternalStore } from "react";

const loaded = new Map<string, unknown>();
const inFlight = new Map<string, Promise<unknown>>();

export const cachedContent = <T>(key: string): T | undefined => loaded.get(key) as T | undefined;

const noSubscription = () => () => {};

/**
 * The cached copy for rendering. While the page hydrates it is `undefined` (what the server
 * rendered), so the first render matches the server HTML even when the background prefetch
 * filled the cache first; React then re-renders with the cached copy straight away.
 */
export const useCachedContent = <T>(key: string): T | undefined =>
  useSyncExternalStore(noSubscription, () => cachedContent<T>(key), () => undefined);

export function loadContent<T>(key: string, fetcher: () => Promise<T | null>): Promise<T | null> {
  const pending = inFlight.get(key);
  if (pending) return pending as Promise<T | null>;
  const request = fetcher()
    .then((value) => {
      if (value) loaded.set(key, value);
      return value;
    })
    .finally(() => inFlight.delete(key));
  inFlight.set(key, request);
  return request;
}
