// eslint-disable-next-line turbo/no-undeclared-env-vars -- Validated and injected by Vite
const apiUrl = import.meta.env.API_URL;

export const apiConfig = {
	url: apiUrl
} as const;
