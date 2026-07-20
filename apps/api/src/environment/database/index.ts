import { connect, disconnect } from 'mongoose';
import { databaseConfig } from '../configs';

export * from './models';

export async function connectDatabase(): Promise<void> {
	await connect(databaseConfig.url);
}

export async function disconnectDatabase(): Promise<void> {
	await disconnect();
}
