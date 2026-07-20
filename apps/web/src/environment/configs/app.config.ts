// eslint-disable-next-line turbo/no-undeclared-env-vars -- Validated and injected by Vite
const environment = import.meta.env.APP_ENVIRONMENT;
// eslint-disable-next-line turbo/no-undeclared-env-vars -- Validated and injected by Vite
const packageVersion = import.meta.env.PACKAGE_VERSION;

export const appConfig = {
	name: 'Restock',
	environment,
	packageVersion,
	version: `v${packageVersion}${environment.slice(0, 1).toLowerCase()}`
} as const;
