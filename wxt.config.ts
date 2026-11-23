import { defineConfig } from "wxt";

// Manifest V3 for Chrome and Edge, and the Firefox build, from one codebase.
// No content scripts and no <all_urls>: the API host is the only site it can reach.
export default defineConfig({
  modules: ["@wxt-dev/module-vue"],
  imports: false,
  // Manifest V3 everywhere, Firefox included (the action and session storage APIs it uses).
  manifestVersion: 3,
  hooks: {
    // `wxt dev` adds "tabs" to the required permissions for reloading, and Chrome warns when a
    // permission is both required and optional. Drop the optional copy when that happens.
    "build:manifestGenerated": (_wxt, manifest) => {
      const required = new Set(manifest.permissions ?? []);
      manifest.optional_permissions = manifest.optional_permissions?.filter(
        (p) => !required.has(p),
      );
    },
  },
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
      ? {
          browser_specific_settings: {
            gecko: {
              id: "extension@dotquad.app",
              // What leaves the browser, as addons.mozilla.org asks: the domains you grade and
              // the links you check (and, only with "Grade on the icon", every site you open).
              data_collection_permissions: { required: ["browsingActivity"] },
            },
          },
        }
      : {}),
  }),
});
