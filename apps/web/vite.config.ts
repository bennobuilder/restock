import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { createViteEnvDefine, emptyStringAsUndefined, stringValidator } from 'validatenv';
import { defineConfig, loadEnv } from 'vite';
import { z } from 'zod';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	return {
		define: createViteEnvDefine(
			{
				...process.env,
				...loadEnv(mode, process.cwd(), ''),
				MODE: mode
			},
			{
				APP_ENVIRONMENT: {
					envKey: 'MODE',
					validator: z.enum(['development', 'production', 'test'])
				},
				API_URL: {
					envKey: 'API_URL',
					validator: z.url({ protocol: /^https?$/ }),
					preprocess: emptyStringAsUndefined,
					defaultValue: 'http://127.0.0.1:8787'
				},
				PACKAGE_VERSION: {
					envKey: 'npm_package_version',
					validator: stringValidator,
					preprocess: emptyStringAsUndefined,
					defaultValue: '0.0.0'
				}
			}
		),
		resolve: {
			tsconfigPaths: true
		},
		server: {
			port: 3000
		},
		plugins: [
			tanstackStart({
				srcDirectory: 'src',
				router: {
					routeFileIgnorePattern: '^(components|hooks|lib)$'
				}
			}),
			nitro(),
			viteReact(),
			tailwindcss()
		]
	};
});
