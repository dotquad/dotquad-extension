/** The domain to grade for a tab's address, or null for pages that have none (new tab, settings, files). */
export function siteDomain(url: string | undefined): string | null {
  if (!url) return null;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
  const host = parsed.hostname.toLowerCase().replace(/\.$/, "");
  // Addresses and single-label hosts (localhost, intranet names) aren't domains to grade.
  if (!host.includes(".") || /^[\d.]+$/.test(host) || host.startsWith("[")) return null;
  return host;
}

/** "Amsterdam, NL", or the country alone, or null. */
export function placeName(loc: { city: string | null; country: string | null }): string | null {
  return [loc.city, loc.country].filter(Boolean).join(", ") || null;
}
