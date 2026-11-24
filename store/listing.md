# Store listings

Draft copy for the Chrome Web Store, Microsoft Edge Add-ons and Firefox Add-ons (addons.mozilla.org). Nothing here is submitted. Fill each store's form from these sections, and check its current rules first: they change often.

Upload the zips from the version's [GitHub release](https://github.com/dotquad/dotquad-extension/releases), so the stores get exactly what CI built:

| Store            | Upload                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------- |
| Chrome Web Store | `dotquad-extension-<version>-chrome.zip`                                                    |
| Edge Add-ons     | the same Chrome zip                                                                         |
| Firefox Add-ons  | `dotquad-extension-<version>-firefox.zip`, plus `-sources.zip` when it asks for source code |

## Name and summary

| Field                            | Copy                                                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Name                             | Dotquad                                                                                                           |
| Summary (132 characters at most) | Grade the site you're on, check links before you click, look up any IP or domain, and see your IP and VPN status. |
| Category                         | Chrome and Edge: Developer Tools. Firefox: Privacy & Security                                                     |
| Website                          | https://dotquad.app/?ref=extension                                                                                |
| Support                          | support@dotquad.app                                                                                               |
| Privacy policy                   | https://dotquad.app/privacy/#extension                                                                            |

## Description

> Dotquad puts its network tools where you browse.
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

## Screenshots

Chrome and Edge: 1280 × 800 (or 640 × 400). Firefox: any size, at least 1280 wide looks best. Take them in light mode, with a second set in dark mode if a store allows more.

1. The popup grading a well-known site (the spec's first screenshot), with your IP at the top.
2. The side panel after "Is this link safe?" on a phishing-shaped link such as `https://google.com@example.com`, showing warning signs.
3. The side panel after "Look up on Dotquad" on a selected IP address.
4. The side panel for a selected CIDR range, showing the subnet math.
5. Settings, with "Grade on the icon" and its warning.

Chrome also asks for a 440 × 280 promo tile: the Dotquad mark on Ink (`#0b1220`) with "Grade any site. Check any link." in Space Grotesk.

**Store icon:** [store-icon-128.png](store-icon-128.png), the same as the extension's 128 px icon. Don't edit it here: it's generated with the other icon sizes from the masters in the Dotquad design folder (`design/brand/extension-icon/`).

## Chrome Web Store: privacy practices

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

**Remote code:** No. All code ships in the package.

**Data usage** (check each against the form's current definitions):

- **Web history:** yes. The domain of a site the user grades, links the user checks and, only with "Grade on the icon" on, the domain of each site opened. Sent to the Dotquad API to answer the request; not logged or stored there.
- **Location:** no. The extension shows where the user's IP address appears to be, but doesn't collect or send location; the API sees the IP address because every request carries it.
- Nothing else (no personal, health, financial, authentication or communication data, no user activity tracking, no website content).

Certify: not sold to third parties, not used or transferred for purposes unrelated to the single purpose, and not used for creditworthiness or lending.

## Firefox Add-ons

- **Data collection:** the manifest declares `browsingActivity` as required (`data_collection_permissions`), matching "Web history" above.
- **Source code:** the build is bundled, so upload `-sources.zip`. Build instructions for reviewers: "Node 22 or later. `npm ci`, then `npm run zip:firefox`. The output is in `.output/`."
- **Notes to reviewer:** "The extension only talks to https://api.dotquad.app. It sends nothing until the user opens the popup or uses the right-click menu. The optional `tabs` permission is requested only when the user turns on 'Grade on the icon' in Settings."

## Edge Add-ons

The Chrome copy works as is. Edge asks for the same description, screenshots, privacy policy URL and category.
