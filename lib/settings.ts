import { browser } from "wxt/browser";

/** Settings live in `storage.local`: the optional API key, and whether to grade every tab. */
export interface Settings {
  /** A Dotquad API key. With one, requests go to /v1 under the key's plan. */
  apiKey: string;
  /** "Grade on the icon": off unless turned on, since it sends every site visited to Dotquad. */
  gradeOnIcon: boolean;
}

const DEFAULTS: Settings = { apiKey: "", gradeOnIcon: false };

export async function getSettings(): Promise<Settings> {
  const stored = await browser.storage.local.get(Object.keys(DEFAULTS));
  return { ...DEFAULTS, ...(stored as Partial<Settings>) };
}

export async function saveSettings(changes: Partial<Settings>): Promise<void> {
  await browser.storage.local.set(changes);
}

/** Only these look like Dotquad keys; anything else is refused before it's saved. */
export const isApiKey = (key: string) => /^dq_live_\w{32}$/.test(key.trim());
