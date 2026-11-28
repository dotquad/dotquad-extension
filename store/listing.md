# Store listings

Everything the Chrome Web Store, Microsoft Edge Add-ons and Firefox Add-ons (addons.mozilla.org) ask for, in the order their dashboards ask for it. Check each store's current rules before submitting: they change often. The Chrome sections follow Google's [listing](https://developer.chrome.com/docs/webstore/cws-dashboard-listing), [images](https://developer.chrome.com/docs/webstore/images), [privacy](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy) and [distribution](https://developer.chrome.com/docs/webstore/cws-dashboard-distribution) guides.

## Files

Upload the zips from the version's [GitHub release](https://github.com/dotquad/dotquad-extension/releases), so the stores get exactly what CI built. The images are in this folder.

| What                           | File                                                                            | Stores                                      |
| ------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------- |
| Package                        | `dotquad-extension-<version>-chrome.zip`                                        | Chrome, Edge                                |
|                                | `dotquad-extension-<version>-firefox.zip`, and `-sources.zip` when asked        | Firefox                                     |
| Store icon, 128 × 128          | [store-icon-128.png](store-icon-128.png)                                        | Chrome (also inside the zip), Edge, Firefox |
| Screenshots, 1280 × 800        | [screenshots/](screenshots/), `1-popup-grade.png` to `5-settings.png`, in order | Chrome (up to 5), Edge (up to 6), Firefox   |
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

| Field              | File                                                                                                                | Required                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Store icon         | [store-icon-128.png](store-icon-128.png)                                                                            | Yes                                                         |
| Global promo video | `https://youtu.be/gRA5QD9g2cE` (the full promo, 37 s; made in Dotquad's brand repo, `brand/video/extension-promo/`) | No                                                          |
| Screenshots        | [screenshots/](screenshots/), all five, in this order:                                                              | At least 1                                                  |
|                    | 1. `1-popup-grade.png`: the popup with your IP and dotquad.app graded A                                             |                                                             |
|                    | 2. `2-link-check.png`: "Is this link safe?" finding warning signs in `https://dotquad.app@example.com`, in an email |                                                             |
|                    | 3. `3-ip-lookup.png`: "Look up on Dotquad" on a selected `1.1.1.1`                                                  |                                                             |
|                    | 4. `4-cidr.png`: the subnet math for a selected `198.51.100.0/22`                                                   |                                                             |
|                    | 5. `5-settings.png`: Settings, with "Grade on the icon" and what it sends                                           |                                                             |
| Small promo tile   | [promo-small-440x280.png](promo-small-440x280.png)                                                                  | No, but listings without one are shown after those with one |
| Marquee promo tile | [promo-marquee-1400x560.png](promo-marquee-1400x560.png)                                                            | No, but needed to be featured                               |

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

Submit in [Partner Center](https://partner.microsoft.com/dashboard/microsoftedge), following Microsoft's [publishing guide](https://learn.microsoft.com/en-us/microsoft-edge/extensions/publish/publish-extension). Every value is written out below. Review takes up to 7 business days.

### Account (once, before the first submission)

- **Program:** register for the Microsoft Edge program in Partner Center.
- **Publisher display name:** BinaryNoir Studios, as on Chrome.
- **Contact email:** an address you check. Microsoft sends review results there.

### Packages

Click "Create new extension", then upload `dotquad-extension-<version>-chrome.zip`. Edge uses the Chrome build as is. The name and the short description come from its manifest and can only change with a new package:

| Manifest field    | Value                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Extension name    | Dotquad                                                                                                                |
| Short description | Grade the site you're on, check links before you click them, look up any IP or domain, and see your IP and VPN status. |

### Availability

| Field      | Value                                      |
| ---------- | ------------------------------------------ |
| Visibility | Public                                     |
| Markets    | All markets (the default), future ones too |

### Properties

| Field                   | Value                                                 |
| ----------------------- | ----------------------------------------------------- |
| Category                | Developer tools                                       |
| Website                 | `https://dotquad.app/apps/`                           |
| Support contact details | `https://github.com/dotquad/dotquad-extension/issues` |
| Mature content          | Not checked                                           |

### Privacy

Microsoft checks these against what the extension does. They match Chrome's answers word for word; if one changes, change both.

**Single purpose description:** Shows network information about websites, links, IP addresses and domains the user chooses, and the user's own IP address, using the Dotquad API.

**Permission justification** (one box per permission):

| Permission                       | Justification                                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `activeTab`                      | Reads the current tab's address when the user opens the popup, so "Grade this site" knows which domain to grade. |
| `contextMenus`                   | Adds "Is this link safe?" for links and "Look up on Dotquad" for selected text.                                  |
| `storage`                        | Keeps the user's settings in local storage, and short-lived answer caches in session storage.                    |
| `sidePanel`                      | Shows right-click results in the side panel.                                                                     |
| Host `https://api.dotquad.app/*` | The Dotquad API, the only server the extension talks to.                                                         |
| `tabs` (optional)                | Asked for only if the user turns on "Grade on the icon", to read each tab's address and show its grade.          |

**Are you using remote code?** "No, I am not using remote code." All code ships in the package.

**Data usage**, "What user data do you plan to collect from users now or in the future?":

- **Web history:** checked. The domain of a site the user grades, links the user checks and, only with "Grade on the icon" on, the domain of each site opened. Sent to the Dotquad API to answer the request; not logged or stored there.
- **Location:** not checked. The extension shows where the user's IP address appears to be, but doesn't collect or send location; the API sees the IP address because every request carries it.
- Nothing else is checked.

**"I certify that the following disclosures are true":** check all of them. The data isn't sold to third parties, isn't used or transferred for purposes unrelated to the single purpose, and isn't used for creditworthiness or lending.

**Privacy policy URL:** `https://dotquad.app/privacy/#extension`

### Store listings

Add English (United States), then fill it in:

| Field                  | Value                                                                                                                                                    | Required |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Description            | The text below (Edge needs 250 to 10,000 characters)                                                                                                     | Yes      |
| Extension logo         | [store-icon-128.png](store-icon-128.png). 128 × 128 is Edge's minimum; it recommends 300 × 300                                                           | Yes      |
| Small promotional tile | [promo-small-440x280.png](promo-small-440x280.png)                                                                                                       | No       |
| Large promotional tile | [promo-marquee-1400x560.png](promo-marquee-1400x560.png)                                                                                                 | No       |
| Screenshots            | [screenshots/](screenshots/), all five: `1-popup-grade.png`, `2-link-check.png`, `3-ip-lookup.png`, `4-cidr.png`, `5-settings.png` (Edge allows up to 6) | No       |
| YouTube video URL      | `https://youtu.be/gRA5QD9g2cE`, the same promo as on Chrome                                                                                              | No       |
| Search terms           | `IP address`, `VPN`, `link checker`, `phishing`, `DNS`, `WHOIS`, `subnet calculator`                                                                     | No       |

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

Search terms aren't shown to users. Edge allows up to 7 terms of 30 characters each, and 21 words in all. These use 10.

### Submit

Click "Publish". In **Notes for certification**, paste:

> No sign-in or test account is needed; every feature works without an API key. To test: open the toolbar popup on any site and click "Grade this site"; right-click any link and choose "Is this link safe?"; select an IP address on a page, right-click it and choose "Look up on Dotquad". The extension only talks to https://api.dotquad.app and sends nothing until the user opens the popup or uses the right-click menu. The optional `tabs` permission is requested only when the user turns on "Grade on the icon" in Settings.

For later versions, say what changed, in the words of the changelog.

## Firefox Add-ons

Submit in the [Developer Hub](https://addons.mozilla.org/developers/), following Mozilla's [submission guide](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/). Signing is usually quick. A person may review it before or after it goes live.

### Account (once, before the first submission)

- **Two-step authentication:** turn it on. The Developer Hub asks for it before the first submission.
- **Display name:** BinaryNoir Studios, as on Chrome.
- **Agreement:** accept the Firefox Add-on Distribution Agreement and the review policies.

### Upload

| Step                 | Value                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| How to distribute    | On this site                                                                                                 |
| Upload               | `dotquad-extension-<version>-firefox.zip`                                                                    |
| Compatible platforms | Firefox only. Untick Firefox for Android: it has no right-click menu or sidebar for the extension to use     |
| Source code          | Yes. Upload `dotquad-extension-<version>-sources.zip`. The package is built and bundled, so Mozilla needs it |

The minimum Firefox version (140) and the add-on ID (`extension@dotquad.app`) come from the manifest.

### Describe add-on

| Field                       | Value                                                                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Name                        | Dotquad                                                                                                                                        |
| Add-on URL                  | `dotquad`, so the listing is `https://addons.mozilla.org/firefox/addon/dotquad/`                                                               |
| Summary                     | Grade the site you're on, check links before you click them, look up any IP or domain, and see your IP and VPN status. (118 of 250 characters) |
| Description                 | The text below                                                                                                                                 |
| This add-on is experimental | Not checked                                                                                                                                    |
| Requires payment            | Not checked. The extension is free, and the optional API key is free too                                                                       |
| Firefox categories          | Privacy & Security, and Web Development (up to 2)                                                                                              |
| Support email               | `support@dotquad.app`                                                                                                                          |
| Support website             | `https://github.com/dotquad/dotquad-extension/issues`                                                                                          |
| License                     | MIT License                                                                                                                                    |
| Privacy policy              | Checked. Paste the text below                                                                                                                  |
| Notes for reviewers         | The text below                                                                                                                                 |

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

**Privacy policy** (paste without the `>` marks):

> Dotquad's extension sends nothing until you use it. It has no content scripts, so it can't read the pages you visit, and no analytics or tracking.
>
> Opening it looks up your own IP address, so our server sees your address, as with any request. We keep that answer in memory for 10 minutes so the next look is fast, then drop it. "Grade this site" sends the current tab's domain, only when you press it.
>
> The right-click menu sends the link or the text you chose, only when you choose "Is this link safe?" or "Look up on Dotquad". CIDR ranges are worked out in your browser and never sent.
>
> "Grade on the icon" is off unless you turn it on. Then the extension sends the domain of each site you open, and has your browser's permission to read your tabs' addresses. Turning it off removes that permission.
>
> Answers are cached in your browser's session storage (five minutes for lookups, a day for grades) and cleared when the browser closes. An API key, if you add one, stays in your browser.
>
> On our side, these requests are handled like the website's tools: your address counts toward a per-minute limit held in memory, and nothing you look up is logged.
>
> The full policy: https://dotquad.app/privacy/#extension

It's the extension section of the site's [privacy policy](https://dotquad.app/privacy/#extension). If that changes, change this too.

**Notes for reviewers:**

> No sign-in or test account is needed; every feature works without an API key. To test: open the toolbar popup on any site and click "Grade this site"; right-click any link and choose "Is this link safe?"; select an IP address on a page, right-click it and choose "Look up on Dotquad". Results open in the sidebar. The extension only talks to https://api.dotquad.app and sends nothing until the user opens the popup or uses the right-click menu. The optional `tabs` permission is requested only when the user turns on "Grade on the icon" in Settings.
>
> To build from the source package: Node 22 or later, then `npm ci` and `npm run zip:firefox`. The output is in `.output/`.

Then click "Submit Version".

### Edit product page

After submitting, open the add-on's "Edit Product Page" and add what the first form didn't ask for:

| Field       | Value                                                                                                                       |
| ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| Icon        | Taken from the manifest. Upload [store-icon-128.png](store-icon-128.png) only if it doesn't show                            |
| Screenshots | [screenshots/](screenshots/), all five, in the order below, each with its caption. No promo tiles: Firefox doesn't use them |
| Homepage    | `https://dotquad.app/apps/`                                                                                                 |
| Tags        | Optional. Pick the security and privacy ones from Mozilla's list                                                            |

Screenshots and their captions, in order:

1. `1-popup-grade.png`: Your IP address, and a grade for the site you're on.
2. `2-link-check.png`: "Is this link safe?" finds the warning signs in a link before you open it.
3. `3-ip-lookup.png`: Look up any IP address you select on a page.
4. `4-cidr.png`: Subnet math for a selected CIDR range, worked out in your browser.
5. `5-settings.png`: Settings, with "Grade on the icon" and what it sends.

### Data collection

The Firefox manifest declares `browsingActivity` as required (`data_collection_permissions`), so Firefox asks for consent at install. That's why it needs Firefox 140 or later. The declaration, the privacy policy above and Chrome's and Edge's "Web history" answer must say the same thing. If one changes, change all of them.
