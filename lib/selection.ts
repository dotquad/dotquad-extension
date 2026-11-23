import { detect } from "@dotquad/net";

export type Selection =
  | { kind: "ip"; value: string }
  | { kind: "domain"; value: string }
  | { kind: "asn"; value: number }
  | { kind: "cidr"; value: string };

/**
 * What a right-clicked selection is. Trims spaces, quotes and trailing punctuation, and
 * takes the host from a pasted URL. Null when it isn't something Dotquad can look up.
 */
export function classify(text: string): Selection | null {
  let v = text.trim().replace(/^["'(<[]+|[">)\]'.,;:!?]+$/g, "");
  if (/^https?:\/\//i.test(v)) {
    try {
      v = new URL(v).hostname.replace(/^\[|\]$/g, "");
    } catch {
      return null;
    }
  }
  if (v.length > 253) return null;
  const { kind } = detect(v);
  switch (kind) {
    case "IPv4":
    case "IPv6":
      return { kind: "ip", value: v };
    case "Domain":
      return { kind: "domain", value: v.toLowerCase() };
    case "ASN":
      return { kind: "asn", value: Number(v.replace(/^as/i, "")) };
    case "CIDR":
      return { kind: "cidr", value: v };
    default:
      return null;
  }
}
