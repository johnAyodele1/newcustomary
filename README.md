# Customry

Customry is a boutique custom-gifting storefront built with React, TypeScript, Vite, Node.js, Express, PostgreSQL, Zod and Paystack.

## Local setup

Requirements: Node.js 20+, npm 10+, PostgreSQL 14+.

```bash
npm install
cp .env.example .env
createdb customry
psql "$DATABASE_URL" -f server/sql/schema.sql
psql "$DATABASE_URL" -f server/sql/seed.sql
npm run dev
```

If `DATABASE_URL` is not exported in your shell, use:

```bash
psql "postgresql://postgres:postgres@localhost:5432/customry" -f server/sql/schema.sql
psql "postgresql://postgres:postgres@localhost:5432/customry" -f server/sql/seed.sql
```

The storefront runs at `http://localhost:5173` and the API at `http://localhost:4000`.

Copy `.env` from `.env.example` and add a Paystack test secret before testing payment initialization. The catalogue and order creation work independently of Paystack configuration.

## Commands

- `npm run dev` starts client and server.
- `npm run typecheck` runs strict TypeScript checks.
- `npm test` runs both Vitest suites.
- `npm run lint` checks both workspaces.
- `npm run format:check` checks Prettier formatting.
- `npm run build` creates production builds.

No Docker is required for local development.

## Design verification

The UI uses the supplied Ink/Paper/Gilt token system, Fraunces for display type, Inter for body copy and IBM Plex Mono for prices/order references. The hero uses the split 45/55 composition and keeps the media box at a fixed 4:5 ratio so a production photograph can replace the placeholder without layout shift. Responsive behavior is explicitly handled for 375px mobile and wide desktop layouts.

## Payment

Paystack initialization happens on the server. The browser never receives the secret key. The server calculates order totals from database prices and verifies the selected product, variant, colour, engraving and quantity before creating an order.
