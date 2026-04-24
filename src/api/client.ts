const STRAPI_ORIGIN = "https://jubilant-basketball-030ed19cd1.strapiapp.com";
const API_BASE = "/strapi";

const DEFAULT_CACHE_TTL_MS = 5 * 60 * 1000;

type CacheEntry<T> = {
  expiresAt: number;
  value: T;
};

type FetchJsonOptions = {
  cacheKey?: string;
  ttlMs?: number;
};

type FetchCandidate = {
  url: string;
  label: string;
  cacheKey?: string;
};

const responseCache = new Map<string, CacheEntry<unknown>>();
const inFlightRequests = new Map<string, Promise<unknown>>();

export function resolveStrapiMediaUrl(raw: string | null | undefined): string {
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  return `${STRAPI_ORIGIN}${raw.startsWith("/") ? raw : `/${raw}`}`;
}

export function buildStrapiUrl(
  path: string,
  params: URLSearchParams,
  target: "proxy" | "direct",
): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const base = target === "proxy" ? API_BASE : STRAPI_ORIGIN;
  const query = params.toString();
  return `${base}${normalizedPath}${query ? `?${query}` : ""}`;
}

export function readApiCache<T>(cacheKey: string): T | null {
  const entry = responseCache.get(cacheKey) as CacheEntry<T> | undefined;
  if (!entry) return null;

  if (entry.expiresAt <= Date.now()) {
    responseCache.delete(cacheKey);
    return null;
  }

  return entry.value;
}

export async function fetchJsonCached<T>(
  url: string,
  { cacheKey = url, ttlMs = DEFAULT_CACHE_TTL_MS }: FetchJsonOptions = {},
): Promise<T> {
  const cached = readApiCache<T>(cacheKey);
  if (cached) return cached;

  const inFlight = inFlightRequests.get(cacheKey) as Promise<T> | undefined;
  if (inFlight) return inFlight;

  const request = fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} from ${url}`);
      }

      return (await response.json()) as T;
    })
    .then((payload) => {
      responseCache.set(cacheKey, {
        expiresAt: Date.now() + ttlMs,
        value: payload,
      });
      return payload;
    })
    .finally(() => {
      inFlightRequests.delete(cacheKey);
    });

  inFlightRequests.set(cacheKey, request);
  return request;
}

export async function fetchFirstJson<T>(
  candidates: FetchCandidate[],
  options: FetchJsonOptions = {},
): Promise<T> {
  const errors: string[] = [];

  for (const candidate of candidates) {
    try {
      return await fetchJsonCached<T>(candidate.url, {
        ...options,
        cacheKey: candidate.cacheKey ?? options.cacheKey ?? candidate.url,
      });
    } catch (error) {
      errors.push(
        `${candidate.label}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  }

  throw new Error(errors.join(" | ") || "Unable to load API data.");
}

export const apiCacheTtl = {
  works: 5 * 60 * 1000,
  workshops: 5 * 60 * 1000,
};
