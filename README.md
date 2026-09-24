# OS-Agent — Darwin landing page

This repository contains a React and TypeScript landing page for the Darwin desktop AI assistant concept. The page presents the product, feature descriptions, a dashboard preview, privacy information, and pricing copy. It is a front-end website; the repository does not include a desktop application, payment backend, authentication service, or production API.

## Run locally

Requires a Node.js version supported by the project's Vite release.

```bash
npm install
npm run dev
```

Open the URL printed by Vite. For a production build and local preview:

```bash
npm run lint
npm run build
npm run preview
```

## Structure

- `src/App.tsx` assembles the page sections.
- `src/components/` contains the hero, dashboard, feature, privacy, pricing, and FAQ sections.
- `src/index.css` holds the site styles.

## Publication review

Pricing, lifetime updates, offline operation, privacy, refund, and download statements appear in page copy. Confirm these statements and connect working checkout, support, and download destinations before presenting the site as an available product. The pricing buttons currently link back to `#pricing`.
