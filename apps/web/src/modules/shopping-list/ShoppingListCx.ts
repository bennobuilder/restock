import type { apiV1 } from '@repo/api/openapi';
import { createState, type TState } from 'feature-state';
import React from 'react';

export class ShoppingListCx {
	public readonly $draftName = createState('');
	public readonly $items: TState<TShoppingItem[]>;

	constructor(initialItems: TShoppingItem[]) {
		this.$items = createState(initialItems);
	}

	public addItem(): void {
		const name = this.$draftName.get().trim();
		if (!name.length) {
			return;
		}

		const item: TShoppingItem = {
			id: crypto.randomUUID(),
			name,
			bought: false,
			createdAt: new Date().toISOString()
		};

		this.$items.set((items) => [...items, item]);
		this.$draftName.set('');
	}

	public setItemBought(itemId: string, bought: boolean): void {
		this.$items.set((items) =>
			items.map((item) => (item.id === itemId ? { ...item, bought } : item))
		);
	}

	public areAllItemsBought(): boolean {
		const items = this.$items.get();
		return items.length > 0 && items.every((item) => item.bought);
	}

	public deleteItem(itemId: string): void {
		this.$items.set((items) => items.filter((item) => item.id !== itemId));
	}
}

export type TShoppingItem = apiV1.components['schemas']['ShoppingItem'];

export function useCreateShoppingListCx(initialItems: TShoppingItem[]): ShoppingListCx {
	return React.useMemo(() => new ShoppingListCx(initialItems), [initialItems]);
}
