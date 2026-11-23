# Dotquad for Chrome, Edge and Firefox

Grade the site you're on, check links before you click them, look up any IP address or domain, and see your own IP and VPN status. Results link to the full tools on [dotquad.app](https://dotquad.app).

Not in the stores yet.

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
npm run dev            # Chrome with the extension loaded
npm run dev:firefox
npm test               # unit tests
npm run build          # .output/chrome-mv3 (also works in Edge)
npm run build:firefox  # .output/firefox-mv3
npm run zip && npm run zip:firefox   # store uploads
```

Built with [WXT](https://wxt.dev), Vue 3 and TypeScript, on [`@dotquad/net`](https://github.com/dotquad/net) (API client, query detection, subnet math) and [`@dotquad/tokens`](https://github.com/dotquad/tokens) (colors, type and icons). Safari gets the extension inside the Dotquad Apple app.

## License

The code is MIT licensed. The Dotquad name, logo and icons aren't: see [LICENSE](LICENSE) and [TRADEMARKS.md](TRADEMARKS.md). The Dotquad service itself is closed source; this repository is client code.
