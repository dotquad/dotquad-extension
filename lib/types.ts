/** The parts of the API's answers the extension shows (full shapes: https://dotquad.app/docs/). */
import type { Grade } from "@dotquad/net";

export interface Finding {
  id: string;
  level: "pass" | "warn" | "fail" | "info";
  title: string;
  detail: string;
  points: number;
}

export interface ReportSection {
  id: "web" | "email" | "dnssec" | "dns" | "registration";
  title: string;
  status: "ok" | "not_applicable" | "unavailable";
  grade: Grade | null;
  summary: string;
  findings: Finding[];
}

/** `GET /ext/check/{domain}`: the domain report card. */
export interface Report {
  domain: string;
  grade: Grade | null;
  score: number | null;
  sections: ReportSection[];
  problems: number;
  checked_at: string;
}

/** `GET /ext/link?url=`: "Is this link safe?" */
export interface LinkCheck {
  url: string;
  host: string;
  final: { url: string; host: string; domain: string; status: number | null };
  signals: {
    id: string;
    level: "danger" | "warning" | "info" | "good";
    title: string;
    detail: string;
  }[];
  verdict: "warning_signs" | "caution" | "no_warning_signs";
}

/** `GET /ext/dns/{query}` for a name. */
export interface DnsName {
  type: "name";
  name: string;
  records: {
    A: { address: string }[];
    AAAA: { address: string }[];
    MX: { priority: number; exchange: string }[];
  };
}

/** `GET /ext/whois/{query}`. */
export interface Whois {
  type: "domain" | "ip" | "asn";
  object: string;
  name: string | null;
  holder: { organization: string | null; country: string | null } | null;
  registrar: { name: string } | null;
  dates: { registered: string | null; expires: string | null };
  network: { range: string } | null;
}
