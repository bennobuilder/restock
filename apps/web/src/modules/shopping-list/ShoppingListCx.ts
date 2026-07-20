import { createState } from 'feature-state';
import React from 'react';

export class ShoppingListCx {
	public readonly $draftName = createState('');
	public readonly $items = createState<TShoppingItem[]>(createOnboardingItems());

	public addItem(): void {
		const name = this.$draftName.get().trim();
		if (!name.length) {
			return;
		}

		const item: TShoppingItem = {
			_id: crypto.randomUUID(),
			name,
			bought: false,
			createdAt: new Date().toISOString()
		};

		this.$items.set((items) => [...items, item]);
		this.$draftName.set('');
	}

	public setItemBought(itemId: string, bought: boolean): void {
		this.$items.set((items) =>
			items.map((item) => (item._id === itemId ? { ...item, bought } : item))
		);
	}

	public areAllItemsBought(): boolean {
		const items = this.$items.get();
		return items.length > 0 && items.every((item) => item.bought);
	}

	public deleteItem(itemId: string): void {
		this.$items.set((items) => items.filter((item) => item._id !== itemId));
	}
}

export interface TShoppingItem {
	_id: string;
	name: string;
	bought: boolean;
	createdAt: string;
}

function createOnboardingItems(): TShoppingItem[] {
	const createdAt = new Date().toISOString();
	return [
		'Add your first restock item',
		'Mark an item as bought',
		'Delete an item you no longer need'
	].map((name) => ({
		_id: crypto.randomUUID(),
		bought: false,
		createdAt,
		name
	}));
}

export function useCreateShoppingListCx(): ShoppingListCx {
	return React.useMemo(() => new ShoppingListCx(), []);
}
