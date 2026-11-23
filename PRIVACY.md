# Privacy

This is the privacy text for the store listings. Dotquad's full policy is at https://dotquad.app/privacy/#extension.

**What the extension sends, and when.** Nothing until you use it:

- **Opening the popup** looks up your own IP address at `api.dotquad.app`, which sees your address because every request carries it. "Grade this site" sends the current tab's domain, only when you press it.
- **The right-click menu** sends the link or the text you selected, only when you choose "Is this link safe?" or "Look up on Dotquad". CIDR ranges are worked out in the browser and not sent.
- **"Grade on the icon"** is off by default. When you turn it on, the extension sends the domain of each site you open, and asks for permission to read your tabs' addresses. Turning it off removes that permission.

**What's kept.** Answers are cached in the browser's session storage, five minutes for lookups and a day for grades, and cleared when the browser closes. Your settings, including an API key if you add one, stay in the browser's local storage. Dotquad's servers keep no logs of what is looked up, and the extension has no analytics or tracking.

**What it can access.** No content scripts and no access to the pages you visit. It reads the current tab's address only when you open the popup, or for every tab only if you turn on "Grade on the icon". It can reach only `api.dotquad.app`.
