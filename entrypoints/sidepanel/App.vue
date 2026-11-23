<script setup lang="ts">
import { calculate, formatAddress, parseInput, rangeKind, type Family } from "@dotquad/net";
import type { Lookup } from "@dotquad/net";
import { onMounted, onUnmounted, ref } from "vue";
import { browser } from "wxt/browser";
import AddressSummary from "../../components/AddressSummary.vue";
import { api } from "../../lib/api";
import { links } from "../../lib/links";
import { errorMessage } from "../../lib/messages";
import { classify } from "../../lib/selection";
import type { DnsName, LinkCheck, Whois } from "../../lib/types";

/** What the right-click menu asked for (written to session storage by the background script). */
interface Request {
  kind: "link" | "selection";
  value: string;
  at: number;
}

type View =
  | { status: "empty" }
  | { status: "loading"; label: string }
  | { status: "error"; message: string }
  | { status: "link"; data: LinkCheck }
  | { status: "ip"; data: Lookup }
  | { status: "domain"; name: string; dns: DnsName | null; whois: Whois | null }
  | { status: "asn"; asn: number; whois: Whois }
  | { status: "cidr"; cidr: string; rows: [string, string][] }
  | { status: "unknown"; text: string };

const view = ref<View>({ status: "empty" });
let latest = 0;

const VERDICT: Record<LinkCheck["verdict"], string> = {
  warning_signs: "Warning signs",
  caution: "Be careful",
  no_warning_signs: "No warning signs",
};
const LEVEL_ORDER = { danger: 0, warning: 1, info: 2, good: 3 } as const;
const sortedSignals = (d: LinkCheck) =>
  [...d.signals].sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);

async function show(request: Request) {
  const mine = ++latest;
  const set = (v: View) => {
    if (mine === latest) view.value = v;
  };
  try {
    if (request.kind === "link") {
      set({ status: "loading", label: "Checking the link…" });
      return set({ status: "link", data: await api.link(request.value) });
    }
    const sel = classify(request.value);
    if (!sel) return set({ status: "unknown", text: request.value.trim().slice(0, 80) });
    switch (sel.kind) {
      case "ip":
        set({ status: "loading", label: `Looking up ${sel.value}…` });
        return set({ status: "ip", data: await api.ip(sel.value) });
      case "domain": {
        set({ status: "loading", label: `Looking up ${sel.value}…` });
        const [dns, whois] = await Promise.allSettled([api.dns(sel.value), api.whois(sel.value)]);
        if (dns.status === "rejected" && whois.status === "rejected") throw dns.reason;
        return set({
          status: "domain",
          name: sel.value,
          dns: dns.status === "fulfilled" ? dns.value : null,
          whois: whois.status === "fulfilled" ? whois.value : null,
        });
      }
      case "asn":
        set({ status: "loading", label: `Looking up AS${sel.value}…` });
        return set({ status: "asn", asn: sel.value, whois: await api.whois(`AS${sel.value}`) });
      case "cidr": {
        // Worked out here: nothing is sent.
        const parsed = parseInput(sel.value);
        if (!parsed) return set({ status: "unknown", text: sel.value });
        const s = calculate(parsed);
        const fmt = (n: bigint) => formatAddress(n, s.family as Family);
        return set({
          status: "cidr",
          cidr: `${fmt(s.network)}/${s.prefix}`,
          rows: [
            ["First address", fmt(s.network)],
            ["Last address", fmt(s.last)],
            ["Netmask", fmt(s.mask)],
            ["Usable hosts", s.hosts.toLocaleString("en-US")],
            ["Range", rangeKind(s)],
          ],
        });
      }
    }
  } catch (err) {
    set({ status: "error", message: errorMessage(err) });
  }
}

function onChange(changes: Record<string, { newValue?: unknown }>, area: string) {
  if (area === "session" && changes.request?.newValue) show(changes.request.newValue as Request);
}

onMounted(async () => {
  browser.storage.onChanged.addListener(onChange);
  const { request } = await browser.storage.session.get("request");
  if (request) show(request as Request);
});
onUnmounted(() => browser.storage.onChanged.removeListener(onChange));
</script>

<template>
  <main aria-live="polite">
    <section v-if="view.status === 'empty'">
      <h1>Dotquad</h1>
      <p class="quiet">
        Right-click a link and choose "Is this link safe?", or select an IP address, domain, ASN or
        CIDR range and choose "Look up on Dotquad".
      </p>
    </section>

    <p v-else-if="view.status === 'loading'" class="quiet" role="status">{{ view.label }}</p>

    <section v-else-if="view.status === 'error'">
      <h1>That didn't work</h1>
      <p class="error" role="alert">{{ view.message }}</p>
    </section>

    <section v-else-if="view.status === 'link'">
      <p class="label">Is this link safe?</p>
      <h1 :class="view.data.verdict === 'no_warning_signs' ? 'ok' : 'flag'">
        {{ VERDICT[view.data.verdict] }}
      </h1>
      <p class="mono small">{{ view.data.url }}</p>
      <p v-if="view.data.final.url !== view.data.url" class="quiet">
        Goes to <span class="mono">{{ view.data.final.host }}</span>
      </p>
      <ul class="signals">
        <li v-for="s in sortedSignals(view.data)" :key="s.id" :class="s.level">
          <strong>{{ s.title }}</strong>
          <span class="quiet">{{ s.detail }}</span>
        </li>
      </ul>
      <p class="quiet">
        This checks for warning signs; it isn't a phishing or malware list, so no warning signs
        isn't a guarantee.
      </p>
      <a :href="links.linkCheck(view.data.url)" target="_blank" class="more"
        >Full check on dotquad.app →</a
      >
    </section>

    <section v-else-if="view.status === 'ip'">
      <p class="label">IP address</p>
      <h1 class="mono">{{ view.data.ip }}</h1>
      <AddressSummary :lookup="view.data" />
      <p v-if="view.data.hostname" class="quiet mono">{{ view.data.hostname }}</p>
      <a :href="links.ip(view.data.ip)" target="_blank" class="more"
        >Full lookup on dotquad.app →</a
      >
    </section>

    <section v-else-if="view.status === 'domain'">
      <p class="label">Domain</p>
      <h1 class="mono">{{ view.name }}</h1>
      <dl v-if="view.dns" class="rows">
        <div v-if="view.dns.records.A.length">
          <dt>IPv4</dt>
          <dd class="mono">{{ view.dns.records.A.map((r) => r.address).join(", ") }}</dd>
        </div>
        <div v-if="view.dns.records.AAAA.length">
          <dt>IPv6</dt>
          <dd class="mono">{{ view.dns.records.AAAA.map((r) => r.address).join(", ") }}</dd>
        </div>
        <div v-if="view.dns.records.MX.length">
          <dt>Mail</dt>
          <dd class="mono">{{ view.dns.records.MX.map((r) => r.exchange).join(", ") }}</dd>
        </div>
      </dl>
      <dl v-if="view.whois" class="rows">
        <div v-if="view.whois.registrar">
          <dt>Registrar</dt>
          <dd>{{ view.whois.registrar.name }}</dd>
        </div>
        <div v-if="view.whois.dates.registered">
          <dt>Registered</dt>
          <dd class="mono">{{ view.whois.dates.registered.slice(0, 10) }}</dd>
        </div>
      </dl>
      <p class="links">
        <a :href="links.report(view.name)" target="_blank" class="more">Grade this domain →</a>
        <a :href="links.dns(view.name)" target="_blank" class="more">DNS records →</a>
      </p>
    </section>

    <section v-else-if="view.status === 'asn'">
      <p class="label">Network</p>
      <h1 class="mono">AS{{ view.asn }}</h1>
      <p>{{ view.whois.holder?.organization ?? view.whois.name ?? "Owner not published" }}</p>
      <a :href="links.asn(view.asn)" target="_blank" class="more">Network page on dotquad.app →</a>
    </section>

    <section v-else-if="view.status === 'cidr'">
      <p class="label">Subnet</p>
      <h1 class="mono">{{ view.cidr }}</h1>
      <dl class="rows">
        <div v-for="[k, v] in view.rows" :key="k">
          <dt>{{ k }}</dt>
          <dd class="mono">{{ v }}</dd>
        </div>
      </dl>
      <p class="quiet">Worked out in your browser. Nothing was sent.</p>
      <a :href="links.subnet(view.cidr)" target="_blank" class="more">Subnet calculator →</a>
    </section>

    <section v-else>
      <h1>Nothing to look up</h1>
      <p class="quiet">
        "{{ view.text }}" isn't an IP address, domain, ASN or CIDR range Dotquad can look up.
      </p>
    </section>
  </main>
</template>

<style scoped>
main {
  padding: 16px;
}
h1 {
  margin: 0 0 6px;
  font: 600 22px/1.2 var(--font-display);
  overflow-wrap: anywhere;
}
h1.mono {
  font-family: var(--font-mono);
  font-size: 19px;
}
h1.ok {
  color: var(--signal);
}
h1.flag {
  color: var(--flag);
}
.small {
  margin: 0 0 6px;
  font-size: 13px;
}
.signals {
  list-style: none;
  margin: 12px 0;
  padding: 0;
  display: grid;
  gap: 8px;
}
.signals li {
  display: grid;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--muted-bg);
}
.signals li.danger,
.signals li.warning {
  background: var(--flag-tint);
}
.signals li.danger strong,
.signals li.warning strong {
  color: var(--flag);
}
.signals li.good {
  background: var(--signal-tint);
}
.rows {
  margin: 12px 0;
  display: grid;
  gap: 6px;
}
.rows div {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 8px;
}
.rows dt {
  color: var(--quiet);
  font-size: 13px;
}
.rows dd {
  margin: 0;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
