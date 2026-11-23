import { gradeTone } from "@dotquad/net";
import { colors } from "@dotquad/tokens";
import { browser } from "wxt/browser";
import { defineBackground } from "wxt/utils/define-background";
import { api } from "../lib/api";
import { getSettings } from "../lib/settings";
import { siteDomain } from "../lib/site";

/**
 * Right-click menus, the side panel, and the opt-in "Grade on the icon". Nothing here sends
 * anything on its own except that last one, which is off until the user turns it on.
 */
export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({ id: "link", title: "Is this link safe?", contexts: ["link"] });
    browser.contextMenus.create({
      id: "lookup",
      title: "Look up “%s” on Dotquad",
      contexts: ["selection"],
    });
  });

  browser.contextMenus.onClicked.addListener((info, tab) => {
    // Open the panel first: browsers allow it only while handling the click.
    openPanel(tab?.windowId);
    const request =
      info.menuItemId === "link"
        ? { kind: "link", value: info.linkUrl ?? "" }
        : { kind: "selection", value: info.selectionText ?? "" };
    void browser.storage.session.set({ request: { ...request, at: Date.now() } });
  });

  browser.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (change.status === "complete") void gradeTab(tabId, tab.url);
  });
  browser.tabs.onActivated.addListener(async ({ tabId }) => {
    const tab = await browser.tabs.get(tabId).catch(() => null);
    if (tab) void gradeTab(tabId, tab.url);
  });
});

function openPanel(windowId: number | undefined) {
  if (import.meta.env.FIREFOX) {
    (browser as unknown as { sidebarAction: { open(): Promise<void> } }).sidebarAction.open();
  } else if (windowId !== undefined) {
    void browser.sidePanel.open({ windowId });
  }
}

const BADGE_COLORS = {
  ok: colors.light.signal,
  neutral: colors.light.quiet,
  flag: colors.light.flag,
} as const;

/** "Grade on the icon": the tab's grade letter, from a report card cached a day per domain. */
async function gradeTab(tabId: number, url: string | undefined) {
  const { gradeOnIcon } = await getSettings();
  if (!gradeOnIcon || !(await browser.permissions.contains({ permissions: ["tabs"] }))) return;
  const domain = siteDomain(url);
  try {
    const report = domain ? await api.check(domain) : null;
    const grade = report?.grade ?? null;
    await browser.action.setBadgeText({ tabId, text: grade ?? "" });
    if (grade)
      await browser.action.setBadgeBackgroundColor({
        tabId,
        color: BADGE_COLORS[gradeTone(grade)],
      });
  } catch {
    // Over the limit or offline: leave the icon plain rather than show a stale grade.
    await browser.action.setBadgeText({ tabId, text: "" }).catch(() => {});
  }
}
