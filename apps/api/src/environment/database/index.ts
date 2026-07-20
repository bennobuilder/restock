import { connect, disconnect } from 'mongoose';
import { databaseConfig } from '../configs';
import { applyDatabaseSeeds } from './seed';

export * from './models';

export async function connectDatabase(): Promise<void> {
	await connect(databaseConfig.url);
	try {
		await applyDatabaseSeeds();
	} catch (error) {
		await disconnectDatabase();
		throw error;
	}
}

export async function disconnectDatabase(): Promise<void> {
	await disconnect();
}
