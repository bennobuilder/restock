import { validateEnv } from 'validatenv';
import { z } from 'zod';

const environment = validateEnv(process.env, {
	url: {
		envKey: 'MONGODB_URI',
		validator: z.url({ protocol: /^mongodb(?:\+srv)?$/ })
	}
});

export const databaseConfig = {
	url: environment.url
} as const;
