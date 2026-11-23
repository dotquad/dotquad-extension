import { createClient } from "@dotquad/net";
import type { Lookup } from "@dotquad/net";
import { browser } from "wxt/browser";
import { createCache, GRADE_TTL_MS, LOOKUP_TTL_MS } from "./cache";
import { getSettings } from "./settings";
import type { DnsName, LinkCheck, Report, Whois } from "./types";

/** The extension's keyless routes, which share the website's per-visitor limits. */
export const EXT_URL = "https://api.dotquad.app/ext";

const cached = createCache({
  get: (key) => browser.storage.session.get(key),
  set: (items) => browser.storage.session.set(items),
});

/** With an API key, the public API under the key's plan; without one, the keyless /ext routes. */
async function client() {
  const { apiKey } = await getSettings();
  const key = apiKey.trim();
  return key ? createClient({ key }) : createClient({ baseUrl: EXT_URL });
}

export const api = {
  me: () => cached("me", LOOKUP_TTL_MS, async () => (await client()).me()),
  ip: (ip: string): Promise<Lookup> =>
    cached(`ip:${ip}`, LOOKUP_TTL_MS, async () => (await client()).ip(ip)),
  dns: (name: string) =>
    cached(
      `dns:${name}`,
      LOOKUP_TTL_MS,
      async () => (await client()).dns(name) as Promise<unknown>,
    ) as Promise<DnsName>,
  whois: (q: string) =>
    cached(
      `whois:${q}`,
      LOOKUP_TTL_MS,
      async () => (await client()).whois(q) as Promise<unknown>,
    ) as Promise<Whois>,
  link: (url: string) =>
    cached(
      `link:${url}`,
      LOOKUP_TTL_MS,
      async () => (await client()).link(url) as Promise<unknown>,
    ) as Promise<LinkCheck>,
  check: (domain: string) =>
    cached(
      `check:${domain}`,
      GRADE_TTL_MS,
      async () => (await client()).check(domain) as Promise<unknown>,
    ) as Promise<Report>,
};
