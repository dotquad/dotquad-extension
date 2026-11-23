<script setup lang="ts">
import type { Lookup } from "@dotquad/net";
import { computed } from "vue";
import { placeName } from "../lib/site";

/** An address's place, network and privacy badge: the popup's "your IP" and side panel lookups. */
const { lookup } = defineProps<{ lookup: Lookup }>();

const place = computed(() => placeName(lookup.location));
const badge = computed(() => {
  const p = lookup.privacy;
  if (!p) return null;
  if (p.tor) return { text: "Tor", tone: "flag" };
  if (p.vpn) return { text: "VPN", tone: "flag" };
  if (p.proxy) return { text: "Proxy", tone: "flag" };
  if (p.hosting) return { text: "Hosting", tone: "flag" };
  return null;
});
</script>

<template>
  <p class="line">{{ place ? `Appears in ${place}` : "Location unknown" }}</p>
  <p class="line">
    <span>{{ lookup.network.org ?? "Unknown network" }}</span>
    <span v-if="lookup.network.asn" class="quiet mono"> · AS{{ lookup.network.asn }}</span>
    <span v-if="badge" class="badge" :class="badge.tone">{{ badge.text }}</span>
  </p>
</template>

<style scoped>
.line {
  margin: 2px 0 0;
}
.badge {
  margin-left: 6px;
}
</style>
