# Store listings

Everything the Chrome Web Store, Microsoft Edge Add-ons and Firefox Add-ons (addons.mozilla.org) ask for, in the order their dashboards ask for it. Check each store's current rules before submitting: they change often. The Chrome sections follow Google's [listing](https://developer.chrome.com/docs/webstore/cws-dashboard-listing), [images](https://developer.chrome.com/docs/webstore/images), [privacy](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy) and [distribution](https://developer.chrome.com/docs/webstore/cws-dashboard-distribution) guides.

## Files

Upload the zips from the version's [GitHub release](https://github.com/dotquad/dotquad-extension/releases), so the stores get exactly what CI built. The images are in this folder.

| What                           | File                                                                            | Stores                                      |
| ------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------- |
| Package                        | `dotquad-extension-<version>-chrome.zip`                                        | Chrome, Edge                                |
|                                | `dotquad-extension-<version>-firefox.zip`, and `-sources.zip` when asked        | Firefox                                     |
| Store icon, 128 × 128          | [store-icon-128.png](store-icon-128.png)                                        | Chrome (also inside the zip), Edge, Firefox |
| Screenshots, 1280 × 800        | [screenshots/](screenshots/), `1-popup-grade.png` to `5-settings.png`, in order | Chrome (up to 5), Edge (up to 10), Firefox  |
| Small promo tile, 440 × 280    | [promo-small-440x280.png](promo-small-440x280.png)                              | Chrome, Edge                                |
| Marquee promo tile, 1400 × 560 | [promo-marquee-1400x560.png](promo-marquee-1400x560.png)                        | Chrome, Edge                                |

**Don't edit the images here.** The store icon is generated with the extension's other icon sizes from the masters in Dotquad's brand repo (`brand/extension-icon/`, by `npm run extension-icon`). The screenshots and promo tiles are captured from the real extension against the live API by `brand/video/extension-promo/capture/capture.mjs` in Dotquad's brand repo (`npm run capture`; its header has the options). The only stand-in is the visitor's own address (`203.0.113.42`, "Example Fiber", AS64500, Portland), from the ranges reserved for documentation, so no one's real IP appears in a listing. The link check uses our own domain (`https://dotquad.app@example.com`) on a made-up mail page, so no other company's name appears. The screenshots are laid out at 800 × 500 and exported at 1.6×, because the store shows them at 640 × 400 and the text has to stay readable. The brand rules behind them are in the brand repo's `design-language.md` ("Video").

## Chrome Web Store

### Account (once, before the first submission)

- **Contact email:** add it and verify it from the email Google sends.
- **Trader status:** trader. The business address and phone number then show on the listing, as EU law requires.
- **Official URL** (optional, recommended): verify `dotquad.app` in [Google Search Console](https://search.google.com/search-console) with the Google account that owns the publisher. It then appears in the listing's Official URL menu, and the store shows dotquad.app under the title instead of only the publisher name.

### Package

Upload `dotquad-extension-<version>-chrome.zip`. The name ("Dotquad"), the summary and the 128 px icon come from its manifest, so the listing can't change them.

| Manifest field | Value                                                                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Name           | Dotquad                                                                                                                                        |
| Summary        | Grade the site you're on, check links before you click them, look up any IP or domain, and see your IP and VPN status. (118 of 132 characters) |

### Store listing

**Description** (paste without the `>` marks; plain text, no Markdown):

> Grade any site. Check any link. Dotquad puts its network tools where you browse.
>
> **Your IP and VPN status.** Open the popup to see your public IP address, where it appears to be, its network, and whether it belongs to a VPN, proxy, Tor or a hosting provider.
>
> **Grade this site.** One click grades the site you're on from A+ to F: HTTPS and security headers, email authentication, DNS, DNSSEC and registration. It also shows where the site is hosted.
>
> **Is this link safe?** Right-click a link to see its warning signs before you open it: a hidden destination, a look-alike brand name, where its redirects really go, how old the sites are, and whether the certificate is valid. It never says a link is "safe": no warning signs isn't a guarantee.
>
> **Look up anything.** Select an IP address, domain, ASN or CIDR range and right-click it. Subnet math runs in your browser.
>
> Every answer names the data source behind it, and links to the full tool on dotquad.app.
>
> **Private by design.** It sends nothing until you open it or use its right-click menu. No content scripts, no access to the pages you visit, no analytics, no tracking. Dotquad keeps no logs of what you look up. "Grade on the icon", which grades every tab, is off until you turn it on.
>
> Free, with no account. Add a free Dotquad API key in Settings if you use it a lot.
>
> The source code is public: https://github.com/dotquad/dotquad-extension
>
> Screenshots include text from Wikipedia (CC BY-SA 4.0).

| Field    | Value                   |
| -------- | ----------------------- |
| Category | Developer Tools         |
| Language | English (United States) |

**Graphic assets:**

| Field              | File                                                                                                                                                                       | Required                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Store icon         | [store-icon-128.png](store-icon-128.png)                                                                                                                                   | Yes                                                         |
| Global promo video | The full promo's YouTube link: upload `brand/video/dotquad-extension-promo-1080p60.mp4` from Dotquad's brand repo (steps in `brand/video/extension-promo/README.md` there) | No                                                          |
| Screenshots        | [screenshots/](screenshots/), all five, in this order:                                                                                                                     | At least 1                                                  |
|                    | 1. `1-popup-grade.png`: the popup with your IP and dotquad.app graded A                                                                                                    |                                                             |
|                    | 2. `2-link-check.png`: "Is this link safe?" finding warning signs in `https://dotquad.app@example.com`, in an email                                                        |                                                             |
|                    | 3. `3-ip-lookup.png`: "Look up on Dotquad" on a selected `1.1.1.1`                                                                                                         |                                                             |
|                    | 4. `4-cidr.png`: the subnet math for a selected `198.51.100.0/22`                                                                                                          |                                                             |
|                    | 5. `5-settings.png`: Settings, with "Grade on the icon" and what it sends                                                                                                  |                                                             |
| Small promo tile   | [promo-small-440x280.png](promo-small-440x280.png)                                                                                                                         | No, but listings without one are shown after those with one |
| Marquee promo tile | [promo-marquee-1400x560.png](promo-marquee-1400x560.png)                                                                                                                   | No, but needed to be featured                               |

The promo tiles follow Google's guidance: no headline text, the whole area filled, saturated color on dark, well-defined edges, and more than a screenshot (the logo and the icon's globe, with the dot over Raleigh, NC; the marquee adds the real popup).

**Additional fields:**

| Field          | Value                                                       |
| -------------- | ----------------------------------------------------------- |
| Official URL   | `https://dotquad.app` (after the Search Console step above) |
| Homepage URL   | `https://dotquad.app/apps/`                                 |
| Support URL    | `https://github.com/dotquad/dotquad-extension/issues`       |
| Mature content | Not checked                                                 |

### Privacy

**Single purpose:** Shows network information about websites, links, IP addresses and domains the user chooses, and the user's own IP address, using the Dotquad API.

**Permission justifications:**

| Permission                       | Justification                                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `activeTab`                      | Reads the current tab's address when the user opens the popup, so "Grade this site" knows which domain to grade. |
| `contextMenus`                   | Adds "Is this link safe?" for links and "Look up on Dotquad" for selected text.                                  |
| `storage`                        | Keeps the user's settings in local storage, and short-lived answer caches in session storage.                    |
| `sidePanel`                      | Shows right-click results in the side panel.                                                                     |
| Host `https://api.dotquad.app/*` | The Dotquad API, the only server the extension talks to.                                                         |
| `tabs` (optional)                | Asked for only if the user turns on "Grade on the icon", to read each tab's address and show its grade.          |

**Remote code:** "No, I am not using remote code." All code ships in the package.

**Data usage** (check each against the form's current definitions):

- **Web history:** checked. The domain of a site the user grades, links the user checks and, only with "Grade on the icon" on, the domain of each site opened. Sent to the Dotquad API to answer the request; not logged or stored there.
- **Location:** not checked. The extension shows where the user's IP address appears to be, but doesn't collect or send location; the API sees the IP address because every request carries it.
- Nothing else (no personally identifiable, health, financial, authentication or communication data, no user activity, no website content).

**Certify all three:** not sold to third parties, not used or transferred for purposes unrelated to the single purpose, and not used for creditworthiness or lending.

**Privacy policy URL:** `https://dotquad.app/privacy/#extension`. It must match the data usage above.

### Distribution

| Field      | Value       |
| ---------- | ----------- |
| Payments   | Free        |
| Visibility | Public      |
| Regions    | All regions |

### Test instructions

None needed: there's no sign-in, and every feature works without an API key.

### Submit

"Submit for review". Untick "publish automatically after review" to choose when it goes live. Promo images are reviewed separately, within about a week.

## Edge Add-ons

[Partner Center](https://partner.microsoft.com/dashboard/microsoftedge) takes the Chrome zip and the Chrome copy as is: description, category (Developer tools), screenshots, both promo tiles, store icon, privacy policy URL, homepage and support URLs. Edge also asks for a search terms list (optional): `IP address, VPN, link checker, phishing, DNS, WHOIS, subnet calculator`.

## Firefox Add-ons

- **Package:** `-firefox.zip`. The build is bundled, so also upload `-sources.zip` when asked. Build instructions for reviewers: "Node 22 or later. `npm ci`, then `npm run zip:firefox`. The output is in `.output/`."
- **Listing:** the same name, summary and description; category Privacy & Security; the store icon and screenshots (no promo tiles); homepage `https://dotquad.app/apps/`; support site `https://github.com/dotquad/dotquad-extension/issues` and support email `support@dotquad.app`; privacy policy `https://dotquad.app/privacy/#extension`.
- **Data collection:** the manifest declares `browsingActivity` as required (`data_collection_permissions`), matching "Web history" above.
- **Notes to reviewer:** "The extension only talks to https://api.dotquad.app. It sends nothing until the user opens the popup or uses the right-click menu. The optional `tabs` permission is requested only when the user turns on 'Grade on the icon' in Settings."
