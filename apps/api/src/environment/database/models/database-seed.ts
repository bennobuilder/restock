import { model, Schema } from 'mongoose';

const databaseSeedSchema = new Schema<TDatabaseSeed>(
	{
		_id: {
			type: String,
			required: true
		}
	},
	{
		collection: 'database_seeds',
		timestamps: {
			createdAt: true,
			updatedAt: false
		},
		versionKey: false
	}
);

export const DatabaseSeedModel = model<TDatabaseSeed>('DatabaseSeed', databaseSeedSchema);

export interface TDatabaseSeed {
	_id: string;
	createdAt: Date;
}
