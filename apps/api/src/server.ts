import { createApi } from './app';
import { connectDatabase, disconnectDatabase } from './environment';

await connectDatabase();

const api = createApi();
const port = 8787;
const server = api.listen(port, () => {
	console.log(`Restock API is running at http://localhost:${port.toString()}`);
});

process.once('SIGINT', handleShutdown);
process.once('SIGTERM', handleShutdown);

function handleShutdown(): void {
	server.close((error) => {
		if (error != null) {
			console.error('Failed to close the Restock API server', error);
			process.exitCode = 1;
		}

		void disconnectDatabase().catch((databaseError: unknown) => {
			console.error('Failed to disconnect the Restock database', databaseError);
			process.exitCode = 1;
		});
	});
}
