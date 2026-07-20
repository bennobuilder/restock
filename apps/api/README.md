# `@repo/api`

The Express and TypeScript API for Restock.

Use the [root quick start](../../README.md#quick-start) to run the full application.

## Run

Run from the repository root:

```sh
cp apps/api/.env.template apps/api/.env.local
pnpm --filter @repo/api db:local:start
pnpm --filter @repo/api start:dev
```

The API listens on [http://localhost:8787](http://localhost:8787). Check readiness with `GET http://localhost:8787/health`.

A new database starts with three onboarding items.

Stop MongoDB without deleting its data:

```sh
pnpm --filter @repo/api db:local:stop
```

## Configuration

| Variable          | Required | Default in template                 | Purpose                 |
| ----------------- | -------- | ----------------------------------- | ----------------------- |
| `MONGODB_URI`     | Yes      | `mongodb://127.0.0.1:27017/restock` | MongoDB connection      |
| `API_CORS_ORIGIN` | No       | `http://localhost:3000`             | Allowed frontend origin |

`MONGODB_URI` accepts `mongodb://` and MongoDB Atlas `mongodb+srv://` URLs.

## Endpoints

| Method   | Path         | Request body           | Success status |
| -------- | ------------ | ---------------------- | -------------- |
| `GET`    | `/items`     | None                   | `200`          |
| `POST`   | `/items`     | `{ "name": "Butter" }` | `201`          |
| `PUT`    | `/items/:id` | `{ "bought": true }`   | `200`          |
| `DELETE` | `/items/:id` | None                   | `204`          |
| `GET`    | `/health`    | None                   | `200`          |

The generated OpenAPI document is available at [`openapi.json`](openapi.json).

## Checks

Run from the repository root:

```sh
pnpm --filter @repo/api lint
pnpm --filter @repo/api build
```
