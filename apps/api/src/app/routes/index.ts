import type { Express } from 'express';
import { createExpressOpenApiRouter } from 'openapi-ts-router/express';
import type { apiV1 } from '@/openapi';
import { registerHealthRoute } from './health';
import { registerItemsRoutes } from './items';

export function registerApiRoutes(api: Express): void {
	const openApiRouter = createExpressOpenApiRouter<apiV1.paths>(api);

	registerItemsRoutes(openApiRouter);
	registerHealthRoute(openApiRouter);
}

export type TApiRouter = ReturnType<typeof createExpressOpenApiRouter<apiV1.paths>>;
