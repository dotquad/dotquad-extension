import { defineConfig } from "wxt";

// Manifest V3 for Chrome and Edge, and the Firefox build, from one codebase.
// No content scripts and no <all_urls>: the API host is the only site it can reach.
export default defineConfig({
  modules: ["@wxt-dev/module-vue"],
  imports: false,
  // Manifest V3 everywhere, Firefox included (the action and session storage APIs it uses).
  manifestVersion: 3,
  manifest: ({ browser }) => ({
    name: "Dotquad",
    description:
      "Grade the site you're on, check links before you click them, look up any IP or domain, and see your IP and VPN status.",
    homepage_url: "https://dotquad.app/?ref=extension",
    permissions: [
      "activeTab",
      "contextMenus",
      "storage",
      ...(browser === "firefox" ? [] : ["sidePanel"]),
    ],
    // Only for "Grade on the icon", asked for when it's turned on.
    optional_permissions: ["tabs"],
    host_permissions: ["https://api.dotquad.app/*"],
    action: { default_title: "Dotquad" },
    ...(browser === "firefox"
      ? { browser_specific_settings: { gecko: { id: "extension@dotquad.app" } } }
      : {}),
  }),
});
