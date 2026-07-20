import type { apiV1 } from '@repo/api/openapi';
import { Err, Ok, type TResult } from 'feature-fetch';
import { createState, type TState } from 'feature-state';
import React from 'react';
import { apiClient } from '@/environment';

export class ShoppingListCx {
	public readonly $draftName = createState('');
	public readonly $errorMessage = createState<string | null>(null);
	public readonly $isAdding = createState(false);
	public readonly $items: TState<TShoppingItem[]>;
	public readonly $pendingItemIds = createState<string[]>([]);

	constructor(initialItems: TShoppingItem[]) {
		this.$items = createState(initialItems);
	}

	public async addItem(): Promise<TShoppingListResult<TShoppingItem>> {
		const name = this.$draftName.get().trim();
		if (!name.length) {
			this.$errorMessage.set('Enter a product name before adding the item.');
			return Err(new Error('Product name is required'));
		}

		if (this.$isAdding.get()) {
			return Err(new Error('A shopping item is already being added'));
		}

		this.$errorMessage.set(null);
		this.$isAdding.set(true);
		const [isItemOk, itemErr, item] = await apiClient.post('/items', {
			body: { name }
		});
		this.$isAdding.set(false);
		if (!isItemOk) {
			this.$errorMessage.set("The item couldn't be added. Try again.");
			return Err(itemErr);
		}

		this.$items.set((items) => [...items, item]);
		this.$draftName.set('');
		return Ok(item);
	}

	public async setItemBought(
		itemId: string,
		bought: boolean
	): Promise<TShoppingListResult<TShoppingItem>> {
		if (this.$pendingItemIds.get().includes(itemId)) {
			return Err(new Error(`Shopping item '${itemId}' already has a pending action`));
		}

		this.$errorMessage.set(null);
		this._setItemPending(itemId, true);
		const [isItemOk, itemErr, item] = await apiClient.put('/items/{id}', {
			pathParams: { id: itemId },
			body: { bought }
		});
		this._setItemPending(itemId, false);
		if (!isItemOk) {
			this.$errorMessage.set("The item couldn't be updated. Try again.");
			return Err(itemErr);
		}

		this.$items.set((items) =>
			items.map((currentItem) => (currentItem.id === itemId ? item : currentItem))
		);
		return Ok(item);
	}

	public areAllItemsBought(): boolean {
		const items = this.$items.get();
		return items.length > 0 && items.every((item) => item.bought);
	}

	public async deleteItem(itemId: string): Promise<TShoppingListResult<void>> {
		if (this.$pendingItemIds.get().includes(itemId)) {
			return Err(new Error(`Shopping item '${itemId}' already has a pending action`));
		}

		this.$errorMessage.set(null);
		this._setItemPending(itemId, true);
		const [isItemDeleted, itemDeleteErr] = await apiClient.delete('/items/{id}', {
			pathParams: { id: itemId }
		});
		this._setItemPending(itemId, false);
		if (!isItemDeleted) {
			this.$errorMessage.set("The item couldn't be deleted. Try again.");
			return Err(itemDeleteErr);
		}

		this.$items.set((items) => items.filter((item) => item.id !== itemId));
		return Ok(undefined);
	}

	public clearError(): void {
		this.$errorMessage.set(null);
	}

	private _setItemPending(itemId: string, isPending: boolean): void {
		this.$pendingItemIds.set((itemIds) =>
			isPending ? [...itemIds, itemId] : itemIds.filter((currentItemId) => currentItemId !== itemId)
		);
	}
}

export type TShoppingItem = apiV1.components['schemas']['ShoppingItem'];

type TShoppingListResult<GValue> = TResult<GValue, Error>;

export function useCreateShoppingListCx(initialItems: TShoppingItem[]): ShoppingListCx {
	return React.useMemo(() => new ShoppingListCx(initialItems), [initialItems]);
}
