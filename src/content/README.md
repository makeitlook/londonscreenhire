# Content editing guide

All editable website copy lives in this folder as JSON. Content editors should
only need to change these files; layout, styling, icons and validation logic
remain in the rest of `src`.

- `site.json` — site name, domain, homepage metadata and business schema copy
- `home.json` — homepage sections, projects, benefits, statistics and reviews
- `contact.json` — phone, email and WhatsApp details
- `navigation.json` — header, footer, links, social profiles and footer credit
- `forms.json` — quote form labels, choices, messages and validation copy
- `services.json` — all nine service pages, including SEO metadata and FAQs
- `legal.json` — privacy policy and website terms
- `ui.json` — shared service-page labels, consent and error messages

Keep JSON keys and icon values unchanged unless a developer is coordinating the
change. Text, URLs, image paths, list entries and placeholder flags are intended
to be edited. JSON does not allow comments or trailing commas.

Items with `"placeholder": true` are not client-verified and should be replaced
or confirmed before launch.
