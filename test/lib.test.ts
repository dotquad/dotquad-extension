import { DotquadError } from "@dotquad/net";
import { describe, expect, it } from "vitest";
import { createCache, GRADE_TTL_MS, LOOKUP_TTL_MS } from "../lib/cache";
import { links } from "../lib/links";
import { errorMessage } from "../lib/messages";
import { classify } from "../lib/selection";
import { placeName, siteDomain } from "../lib/site";

describe("classify", () => {
  it("recognises what a selection holds", () => {
    expect(classify(" 8.8.8.8 ")).toEqual({ kind: "ip", value: "8.8.8.8" });
    expect(classify("2606:4700:4700::1111")).toEqual({ kind: "ip", value: "2606:4700:4700::1111" });
    expect(classify('"Example.COM".')).toEqual({ kind: "domain", value: "example.com" });
    expect(classify("https://github.com/dotquad")).toEqual({ kind: "domain", value: "github.com" });
    expect(classify("AS13335")).toEqual({ kind: "asn", value: 13335 });
    expect(classify("10.0.0.0/22")).toEqual({ kind: "cidr", value: "10.0.0.0/22" });
  });

  it("returns null for anything else", () => {
    expect(classify("hello there")).toBeNull();
    expect(classify("256.1.1.1")).toBeNull();
    expect(classify("")).toBeNull();
  });
});

describe("siteDomain", () => {
  it("grades web pages only", () => {
    expect(siteDomain("https://www.github.com/a?b")).toBe("www.github.com");
    expect(siteDomain("http://example.org.")).toBe("example.org");
    expect(siteDomain("chrome://settings")).toBeNull();
    expect(siteDomain("about:blank")).toBeNull();
    expect(siteDomain("http://localhost:3000")).toBeNull();
    expect(siteDomain("http://192.168.1.1/")).toBeNull();
    expect(siteDomain(undefined)).toBeNull();
  });

  it("names a place from what's known", () => {
    expect(placeName({ city: "Amsterdam", country: "NL" })).toBe("Amsterdam, NL");
    expect(placeName({ city: null, country: "NL" })).toBe("NL");
    expect(placeName({ city: null, country: null })).toBeNull();
  });
});

describe("createCache", () => {
  function memory() {
    const map = new Map<string, unknown>();
    return {
      get: async (k: string) => (map.has(k) ? { [k]: map.get(k) } : {}),
      set: async (items: Record<string, unknown>) => {
        for (const [k, v] of Object.entries(items)) map.set(k, v);
      },
    };
  }

  it("keeps lookups five minutes and grades a day", async () => {
    let now = 0;
    const cached = createCache(memory(), () => now);
    let loads = 0;
    const load = async () => ++loads;
    await cached("ip:8.8.8.8", LOOKUP_TTL_MS, load);
    await cached("ip:8.8.8.8", LOOKUP_TTL_MS, load);
    expect(loads).toBe(1);
    now += LOOKUP_TTL_MS;
    await cached("ip:8.8.8.8", LOOKUP_TTL_MS, load);
    expect(loads).toBe(2);
    await cached("check:a.com", GRADE_TTL_MS, load);
    now += GRADE_TTL_MS - 1;
    expect(await cached("check:a.com", GRADE_TTL_MS, load)).toBe(3);
  });

  it("doesn't keep failures", async () => {
    const cached = createCache(memory(), () => 0);
    await expect(
      cached("x", LOOKUP_TTL_MS, async () => {
        throw new Error("down");
      }),
    ).rejects.toThrow("down");
    expect(await cached("x", LOOKUP_TTL_MS, async () => "ok")).toBe("ok");
  });
});

describe("errorMessage", () => {
  const err = (status: number, details: Record<string, unknown>) =>
    new DotquadError(status, details);
  it("says what to do for each kind of failure", () => {
    expect(
      errorMessage(
        err(429, { code: "rate_limited", reason: "quota", resets_at: "2026-12-01T00:00:00Z" }),
      ),
    ).toBe("Your key's requests for this month are used up. They reset on December 1.");
    expect(errorMessage(err(429, { code: "rate_limited", reason: "per_minute" }))).toMatch(
      /Try again in a minute/,
    );
    expect(errorMessage(err(401, { code: "invalid_key" }))).toMatch(/Check it in Settings/);
    expect(errorMessage(err(0, { code: "network_error" }))).toMatch(/Couldn't reach Dotquad/);
    expect(
      errorMessage(err(400, { code: "invalid_ip", message: "The address isn't valid." })),
    ).toBe("The address isn't valid.");
    expect(errorMessage(new Error("x"))).toBe("Something went wrong. Try again.");
  });
});

describe("links", () => {
  it("tags every link back to dotquad.app", () => {
    expect(links.report("github.com")).toBe("https://dotquad.app/check/github.com?ref=extension");
    expect(links.ip("8.8.8.8")).toBe("https://dotquad.app/?ip=8.8.8.8&ref=extension");
    expect(links.privacy()).toBe("https://dotquad.app/privacy/?ref=extension#extension");
  });
});
