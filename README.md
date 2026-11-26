# Dotquad for Chrome, Edge and Firefox

Grade the site you're on, check links before you click them, look up any IP address or domain, and see your own IP and VPN status. Results link to the full tools on [dotquad.app](https://dotquad.app).

Get it from the [Chrome Web Store](https://chromewebstore.google.com/detail/dotquad/angndblbiakjggdcibejljiidgcnekmj). Edge Add-ons and Firefox Add-ons are coming soon.

## What it does

- **Your IP:** the toolbar popup shows your public IP, where it appears to be, its network, and a VPN, proxy, Tor or hosting badge.
- **Grade this site:** the domain report card for the current tab (HTTPS, email, DNS, DNSSEC and registration, graded A+ to F) and where it's hosted.
- **Is this link safe?** Right-click a link. The side panel shows the warning signs, most serious first. It never says "safe": no warning signs isn't a guarantee.
- **Look up on Dotquad:** select an IP address, domain, ASN or CIDR range and right-click it.
- **Grade on the icon:** each tab's grade on the toolbar icon. Off by default; see below.

## Privacy

It sends nothing until you open it or use its right-click menu, and has no content scripts, analytics or tracking. "Grade on the icon" is the one exception, and it's off until you turn it on. Details in [PRIVACY.md](PRIVACY.md).

## Permissions

| Permission                  | Why                                                          |
| --------------------------- | ------------------------------------------------------------ |
| `activeTab`                 | Read the current tab's address, only when you open the popup |
| `contextMenus`              | "Is this link safe?" and "Look up on Dotquad"                |
| `storage`                   | Settings, and short-lived caches in session storage          |
| `sidePanel` (Chrome, Edge)  | Right-click results (Firefox uses its sidebar)               |
| `https://api.dotquad.app/*` | Calling the API, and nothing else                            |
| `tabs` (optional)           | Only for "Grade on the icon", asked for when you turn it on  |

## API key

Without a key, the extension uses Dotquad's keyless `/ext` routes, limited per address like the website's tools. With a [free API key](https://dotquad.app/signup/?ref=extension) in Settings, lookups go to the public API under your plan.

## Develop

```sh
npm install
npm run dev            # builds .output/chrome-mv3-dev and rebuilds on every change
npm run dev:firefox    # the same for Firefox, which usually opens with the extension loaded
npm test               # unit tests
```

**Load it in Chrome or Edge.** Current Chrome no longer lets tools load extensions for you, so do it once while `npm run dev` runs:

1. Open `chrome://extensions` (Edge: `edge://extensions`) and turn on **Developer mode**.
2. Click **Load unpacked** and choose `.output/chrome-mv3-dev`. In the macOS file picker, ⌘⇧G takes a typed path.
3. Pin **Dotquad** from the puzzle-piece menu.

Code changes rebuild and reload it while `npm run dev` runs. For a one-off build instead, `npm run build` and load `.output/chrome-mv3`.

**Load it in Firefox** if it doesn't open by itself: `about:debugging#/runtime/this-firefox`, **Load Temporary Add-on**, and choose `.output/firefox-mv3-dev/manifest.json`.

## Release

1. Add the changes under `## [Unreleased]` in [CHANGELOG.md](CHANGELOG.md), then move them under a new version heading.
2. `npm version patch` (or `minor`, `major`) to bump `package.json` and tag, then `git push --follow-tags`.
3. The tag runs [release.yml](.github/workflows/release.yml): checks, tests, then a GitHub release with the Chrome, Firefox and sources zips.
4. Upload those zips to the stores by hand, using [store/listing.md](store/listing.md).

Built with [WXT](https://wxt.dev), Vue 3 and TypeScript, on [`@dotquad/net`](https://github.com/dotquad/net) (API client, query detection, subnet math) and [`@dotquad/tokens`](https://github.com/dotquad/tokens) (colors, type and icons). Safari gets the extension inside the Dotquad Apple app.

## License

The code is MIT licensed. The Dotquad name, logo and icons aren't: see [LICENSE](LICENSE) and [TRADEMARKS.md](TRADEMARKS.md). The Dotquad service itself is closed source; this repository is client code.
