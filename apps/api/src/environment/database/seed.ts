import { DatabaseSeedModel, ShoppingItemModel } from './models';

export async function applyDatabaseSeeds(): Promise<void> {
	const seedId = 'onboarding-items-v1';
	const hasAppliedSeed = (await DatabaseSeedModel.exists({ _id: seedId })) != null;
	if (hasAppliedSeed) {
		return;
	}

	const hasShoppingItems = (await ShoppingItemModel.exists({})) != null;
	if (!hasShoppingItems) {
		await ShoppingItemModel.create([
			{ name: 'Add your first restock item' },
			{ name: 'Mark an item as bought' },
			{ name: 'Delete an item you no longer need' }
		]);
	}

	await DatabaseSeedModel.create({ _id: seedId });
}
