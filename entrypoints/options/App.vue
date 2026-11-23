<script setup lang="ts">
import { onMounted, ref } from "vue";
import { browser } from "wxt/browser";
import { links } from "../../lib/links";
import { getSettings, isApiKey, saveSettings } from "../../lib/settings";

const key = ref("");
const savedKey = ref("");
const keyNote = ref<string | null>(null);
const gradeOnIcon = ref(false);
const iconNote = ref<string | null>(null);

onMounted(async () => {
  const s = await getSettings();
  key.value = savedKey.value = s.apiKey;
  // The setting only counts while the browser still grants the permission.
  gradeOnIcon.value =
    s.gradeOnIcon && (await browser.permissions.contains({ permissions: ["tabs"] }));
});

/** Cached answers came from the other route (keyed or keyless), so drop them. */
async function clearCache() {
  const all = await browser.storage.session.get(null);
  await browser.storage.session.remove(Object.keys(all).filter((k) => k.startsWith("cache:")));
}

async function saveKey() {
  const value = key.value.trim();
  if (value && !isApiKey(value)) {
    keyNote.value = "That doesn't look like a Dotquad key. They start with dq_live_.";
    return;
  }
  await saveSettings({ apiKey: value });
  await clearCache();
  savedKey.value = value;
  keyNote.value = value ? "Saved. Lookups now use your key's plan." : "Removed.";
}

async function removeKey() {
  key.value = "";
  await saveKey();
}

async function toggleGradeOnIcon(event: Event) {
  const on = (event.target as HTMLInputElement).checked;
  iconNote.value = null;
  if (on) {
    // Must be asked for while handling the click.
    const granted = await browser.permissions.request({ permissions: ["tabs"] });
    gradeOnIcon.value = granted;
    if (!granted) iconNote.value = "Your browser didn't grant the permission, so it stays off.";
    await saveSettings({ gradeOnIcon: granted });
    return;
  }
  gradeOnIcon.value = false;
  await saveSettings({ gradeOnIcon: false });
  for (const tab of await browser.tabs.query({}))
    if (tab.id !== undefined) await browser.action.setBadgeText({ tabId: tab.id, text: "" });
  // Dev builds require "tabs", and a required permission can't be removed.
  await browser.permissions.remove({ permissions: ["tabs"] }).catch(() => {});
}
</script>

<template>
  <main>
    <h1>Dotquad settings</h1>

    <section aria-labelledby="key-h">
      <h2 id="key-h">API key</h2>
      <p class="quiet">
        Optional. Without one, the extension uses Dotquad's keyless lookups, limited per address.
        With a key, lookups count against your plan (a free key covers 30,000 requests a month). The
        key stays in this browser's storage.
        <a :href="links.signup()" target="_blank">Get a free key</a>
      </p>
      <form class="key-row" @submit.prevent="saveKey">
        <label class="visually-hidden" for="key">API key</label>
        <input
          id="key"
          v-model="key"
          class="mono"
          type="password"
          autocomplete="off"
          spellcheck="false"
          placeholder="dq_live_…"
        />
        <button type="submit" class="btn btn-primary">Save</button>
        <button v-if="savedKey" type="button" class="btn" @click="removeKey">Remove</button>
      </form>
      <p v-if="keyNote" class="note" role="status">{{ keyNote }}</p>
    </section>

    <section aria-labelledby="icon-h">
      <h2 id="icon-h">Grade on the icon</h2>
      <label class="toggle">
        <input type="checkbox" :checked="gradeOnIcon" @change="toggleGradeOnIcon" />
        <span>Show each tab's grade on the toolbar icon</span>
      </label>
      <p class="quiet">
        Off by default. When it's on, the extension sends the domain of every site you open to
        Dotquad to grade it, and asks your browser for permission to read your tabs' addresses.
        Grades are kept for a day in this browser's session, then forgotten. Dotquad doesn't log
        what it grades.
      </p>
      <p v-if="iconNote" class="note" role="status">{{ iconNote }}</p>
    </section>

    <p class="quiet">
      The extension sends nothing until you open it or use its right-click menu.
      <a :href="links.privacy()" target="_blank">Privacy policy</a>
    </p>
  </main>
</template>

<style scoped>
main {
  max-width: 620px;
  margin: 0 auto;
  padding: 32px 20px;
}
h1 {
  margin: 0 0 20px;
  font: 600 28px var(--font-display);
}
h2 {
  margin: 0 0 6px;
  font-size: 16px;
}
section {
  margin-bottom: 28px;
}
.key-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}
input[type="password"] {
  flex: 1 1 260px;
  min-height: 38px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  color: var(--text);
  font-size: 14px;
}
.toggle {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 8px 0;
  font-weight: 600;
  cursor: pointer;
}
.toggle input {
  width: 18px;
  height: 18px;
  accent-color: var(--signal);
}
.note {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--signal);
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>
