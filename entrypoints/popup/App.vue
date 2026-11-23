<script setup lang="ts">
import type { Lookup } from "@dotquad/net";
import { computed, onMounted, ref } from "vue";
import { browser } from "wxt/browser";
import AddressSummary from "../../components/AddressSummary.vue";
import GradeBadge from "../../components/GradeBadge.vue";
import { api } from "../../lib/api";
import { links } from "../../lib/links";
import { errorMessage } from "../../lib/messages";
import { placeName, siteDomain } from "../../lib/site";
import type { Report } from "../../lib/types";

type Load<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ok"; data: T }
  | { status: "error"; message: string };

const me = ref<Load<Lookup>>({ status: "loading" });
const domain = ref<string | null>(null);
const report = ref<Load<Report>>({ status: "idle" });
/** "Hosted by …": the network and country of the first address the domain resolves to. */
const host = ref<{ ip: string; org: string | null; place: string | null } | null>(null);
const copied = ref(false);

const SHORT: Record<string, string> = {
  web: "HTTPS",
  email: "Email",
  dns: "DNS",
  dnssec: "DNSSEC",
  registration: "Reg",
};
const sections = computed(() =>
  report.value.status === "ok"
    ? report.value.data.sections
        .map((s) => `${SHORT[s.id] ?? s.title} ${s.grade ?? "–"}`)
        .join(" · ")
    : "",
);

onMounted(async () => {
  // activeTab: the current tab's address is readable only because the user opened the popup.
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  domain.value = siteDomain(tab?.url);
  try {
    me.value = { status: "ok", data: await api.me() };
  } catch (err) {
    me.value = { status: "error", message: errorMessage(err) };
  }
});

async function copyIp() {
  if (me.value.status !== "ok") return;
  await navigator.clipboard.writeText(me.value.data.ip);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1600);
}

async function grade() {
  if (!domain.value || report.value.status === "loading") return;
  report.value = { status: "loading" };
  host.value = null;
  try {
    report.value = { status: "ok", data: await api.check(domain.value) };
  } catch (err) {
    report.value = { status: "error", message: errorMessage(err) };
    return;
  }
  try {
    const dns = await api.dns(domain.value);
    const ip = dns.records.A[0]?.address ?? dns.records.AAAA[0]?.address;
    if (ip) {
      const where = await api.ip(ip);
      host.value = { ip, org: where.network.org, place: placeName(where.location) };
    }
  } catch {
    // The grade is the answer; the host line is a bonus.
  }
}

const openSettings = () => browser.runtime.openOptionsPage();
</script>

<template>
  <main>
    <section class="block" aria-labelledby="me-h">
      <h1 id="me-h" class="label">Your IP</h1>
      <p v-if="me.status === 'loading'" class="quiet">Looking up your address…</p>
      <p v-else-if="me.status === 'error'" class="error" role="alert">{{ me.message }}</p>
      <template v-else-if="me.status === 'ok'">
        <div class="ip-row">
          <a :href="links.ip(me.data.ip)" target="_blank" class="ip mono">{{ me.data.ip }}</a>
          <button type="button" class="btn small" @click="copyIp">
            {{ copied ? "Copied" : "Copy" }}
          </button>
        </div>
        <AddressSummary :lookup="me.data" />
      </template>
    </section>

    <section class="block" aria-labelledby="site-h">
      <h2 id="site-h" class="label">This site</h2>
      <template v-if="domain">
        <p class="domain mono">{{ domain }}</p>
        <button
          v-if="report.status !== 'ok'"
          type="button"
          class="btn btn-primary"
          :disabled="report.status === 'loading'"
          @click="grade"
        >
          {{ report.status === "loading" ? "Grading…" : "Grade this site" }}
        </button>
        <p v-if="report.status === 'error'" class="error" role="alert">{{ report.message }}</p>
        <div v-if="report.status === 'ok'" class="result">
          <GradeBadge :grade="report.data.grade" />
          <div>
            <p class="sections">{{ sections }}</p>
            <p v-if="host" class="quiet">
              Hosted by {{ host.org ?? "an unknown network"
              }}<template v-if="host.place">, {{ host.place }}</template>
            </p>
          </div>
        </div>
        <a v-if="report.status === 'ok'" :href="links.report(domain)" target="_blank" class="more"
          >Full report on dotquad.app →</a
        >
      </template>
      <p v-else class="quiet">Open a website to grade it.</p>
    </section>

    <footer class="foot">
      <button type="button" class="link-btn" @click="openSettings">Settings</button>
      <a :href="links.privacy()" target="_blank" class="quiet">Privacy</a>
    </footer>
  </main>
</template>

<style scoped>
main {
  width: 360px;
}
.block {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
}
.ip-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.ip {
  font-size: 19px;
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
}
.btn.small {
  min-height: 30px;
  padding: 0 12px;
  font-size: 13px;
}
.domain {
  margin: 0 0 10px;
  font-weight: 600;
}
.result {
  display: flex;
  gap: 12px;
  align-items: center;
  margin: 4px 0 8px;
}
.sections {
  margin: 0;
  font-size: 13px;
}
.result .quiet {
  margin: 4px 0 0;
}
.foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
}
.link-btn {
  border: 0;
  background: none;
  padding: 0;
  color: var(--signal);
  font: 600 13px var(--font-text);
  cursor: pointer;
}
</style>
