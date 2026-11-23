/** Links back to dotquad.app, each tagged so the site can count visits from the extension. */
export const SITE = "https://dotquad.app";

export function siteLink(path: string, params: Record<string, string> = {}, hash = ""): string {
  const url = new URL(path, SITE);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  url.searchParams.set("ref", "extension");
  url.hash = hash;
  return url.toString();
}

export const links = {
  ip: (ip: string) => siteLink("/", { ip }),
  report: (domain: string) => siteLink(`/check/${encodeURIComponent(domain)}`),
  linkCheck: (url: string) => siteLink("/link-check/", { q: url }),
  dns: (q: string) => siteLink("/dns/", { q }),
  whois: (q: string) => siteLink("/whois/", { q }),
  asn: (n: number) => siteLink(`/asn/${n}`),
  subnet: (cidr: string) => siteLink("/subnet/", { q: cidr }),
  signup: () => siteLink("/signup/"),
  privacy: () => siteLink("/privacy/", {}, "extension"),
};
