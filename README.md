# Directory

Minimal working searchable directory.

## Features

- View a small static directory of fictional entries.
- Search names, categories, and descriptions.
- Filter by category.
- Preserve search and category state in the URL.
- Open statically generated detail pages.
- Return a proper 404 for unknown item IDs.

## Stack

- Next.js and React
- TypeScript and plain CSS
- Vercel-compatible static and server-rendered pages

## Run locally

Requirements: Node.js 20.9 or newer.

```bash
git clone https://github.com/basecaseworks/directory.git
cd directory
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No database, external service, or environment variable is required.

## Data

Directory entries live in [`src/data/items.ts`](./src/data/items.ts). Each entry has an `id`, `name`, `category`, `description`, and `location`.

To add an entry, add another object with a unique slug-like `id` and the required fields. The list, search, category links, and static detail route use the same data automatically.

To add a category, use that category on an entry. Categories are derived from the data and displayed in alphabetical order. To change the fields, update the `DirectoryItem` type and the list/detail rendering together.

Search and category state use query parameters such as `/?q=coffee&category=Cafe`. Search is case-insensitive and trimmed, and matches name, category, and description. Invalid category values are treated as `All`.

## Tests

Run the complete local verification with:

```bash
npm run verify
```

Tests cover data completeness and IDs, search, category filtering, combined filters, URL state, static route generation, valid detail rendering, unknown-item 404 handling, and the no-results state.

## Deployment

Deploy the repository as a Next.js project on Vercel. No environment variables or managed services are required.

## Intentionally not included

Authentication, a database, APIs, editing, entry creation, favorites, ratings, reviews, comments, maps, geolocation, pagination, analytics, external data, images, and complex search are outside this reference implementation.
