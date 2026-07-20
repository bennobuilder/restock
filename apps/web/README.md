# `@repo/web`

The React and TypeScript frontend for Restock.

Use the [root quick start](../../README.md#quick-start) to run the full application.

## Run

Start the frontend from the repository root:

```sh
pnpm --filter @repo/web start:dev
```

Open [http://localhost:3000](http://localhost:3000). The shopping list requires a running API.

## Configuration

`API_URL` defaults to `http://127.0.0.1:8787`. Override it when the API runs elsewhere:

```sh
cp apps/web/.env.template apps/web/.env.local
```

## Checks

Run from the repository root:

```sh
pnpm --filter @repo/web lint
pnpm --filter @repo/web build
```
