# rakhats.tech

Rakhat Shakimbekov’s personal website: selected work, experience, and field notes on AI, engineering, tools, and community.

Built with semantic HTML, CSS, browser JavaScript, and a small Node.js static generator. No runtime services, API keys, cookies, tracking scripts, or package dependencies.

## Run locally

Requires Node.js 22 or newer.

```sh
npm run build
npm run check
npm run dev
```

Open http://127.0.0.1:4321. Restart the preview after changing source files. Generated output is in `dist/`.

## Features

- Responsive portfolio and selected work
- Searchable blog with topic filters and individual article URLs
- Persistent light/dark theme and reduced-motion support
- Reading progress, copy-link sharing, email contact and clipboard shortcut
- RSS feed at `/feed.xml`, sitemap, canonical URLs and structured metadata
- Original LinkedIn source attribution on every imported note
- Custom 404 page and security headers

## Add a post

Add a JSON file in `content/posts/` using an existing post as the template. Fields: `slug`, `title`, `description`, `category`, `date` (YYYY-MM-DD), `source`, `sourceLabel`, and `paragraphs`. Paragraphs may be strings or `{ "heading": "Section heading" }`. An optional `links` list contains `{ "label": "…", "url": "https://…" }`. Set `featured: true` on one post to feature it on the homepage.

LinkedIn import is manual. Use only Rakhat’s authored text, preserve source links, and distinguish third-party reposts from his own writing. Dates reflect the original post in Hong Kong time. Imported posts have minor formatting and heading edits for readability. Company project metrics are self-reported on the public LinkedIn profile, not independent audits.

## Deploy

Vercel project `rakhats-tech`, team `own-x-startup`. Build command `npm run build`, output `dist`, framework preset Other. `vercel.json` configures clean URLs and headers. The GitHub repository is the source of truth; push changes to `main` for production deployment once connected.

Canonical domain: https://rakhats.tech. Configure the exact A and CNAME values returned by Vercel in manage.get.tech; keep existing nameservers and unrelated DNS records.
