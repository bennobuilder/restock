import { createRouter } from '@tanstack/react-router';
import { ErrorPage } from '@/components';
import { routeTree } from './routeTree.gen';

export function getRouter() {
	const router = createRouter({
		routeTree,
		defaultErrorComponent: ErrorPage,
		defaultPreload: 'intent',
		scrollRestoration: true
	});

	return router;
}

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
