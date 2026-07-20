import type { apiV1 } from '@repo/api/openapi';
import { createOpenApiFetchClient } from 'feature-fetch';
import { apiConfig } from '@/environment/configs/api.config';

export const apiClient = createOpenApiFetchClient<apiV1.paths>({
	baseUrl: apiConfig.url
});
