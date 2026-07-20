import type { CallbackEvent } from '@shopify/polaris-types';
import { useCompute, useFeatureState } from 'feature-react/state';
import React from 'react';
import { useConfetti } from '@/hooks';
import { cn } from '@/lib';
import { ShoppingListCx, type TShoppingItem } from './ShoppingListCx';

export const ShoppingList: React.FC<TShoppingListProps> = (props) => {
	const { cx } = props;
	const items = useFeatureState(cx.$items);
	const errorMessage = useFeatureState(cx.$errorMessage);
	const boughtItemCount = items.filter((item) => item.bought).length;
	const triggerConfetti = useConfetti();

	const handleItemBoughtChange = React.useCallback(
		async (itemId: string, bought: boolean) => {
			const [isItemOk, itemErr] = await cx.setItemBought(itemId, bought);
			if (!isItemOk) {
				console.error('Failed to update shopping item', itemErr);
				return;
			}

			if (bought && cx.areAllItemsBought()) {
				triggerConfetti();
			}
		},
		[cx, triggerConfetti]
	);

	const handleErrorDismiss = React.useCallback(() => {
		cx.clearError();
	}, [cx]);

	return (
		<s-section heading="Shopping list">
			<AddItemForm cx={cx} />
			{errorMessage != null ? (
				<div className="mt-4">
					<s-banner
						dismissible
						heading="The shopping list couldn't be updated"
						tone="critical"
						onDismiss={handleErrorDismiss}
					>
						<s-paragraph>{errorMessage}</s-paragraph>
					</s-banner>
				</div>
			) : null}

			<div className="mt-5">
				{items.length > 0 ? (
					<>
						<div className="mb-2">
							<s-paragraph color="subdued">
								{boughtItemCount} out of {items.length} {items.length === 1 ? 'item' : 'items'}{' '}
								bought
							</s-paragraph>
						</div>
						<s-box background="base" border="base" borderRadius="base" overflow="hidden">
							<ul className="divide-y divide-black/10">
								{items.map((item) => (
									<ShoppingItemRow
										cx={cx}
										item={item}
										key={item.id}
										onItemBoughtChange={handleItemBoughtChange}
									/>
								))}
							</ul>
						</s-box>
					</>
				) : (
					<div className="py-10 text-center">
						<p className="font-medium">Your list is empty</p>
						<p className="mt-1 text-sm text-black/60">Add the first product you need to restock.</p>
					</div>
				)}
			</div>
		</s-section>
	);
};

interface TShoppingListProps {
	cx: ShoppingListCx;
}

const AddItemForm: React.FC<TAddItemFormProps> = (props) => {
	const { cx } = props;
	const draftName = useFeatureState(cx.$draftName);
	const isAdding = useFeatureState(cx.$isAdding);

	const handleDraftInput = React.useCallback(
		(event: CallbackEvent<'s-text-field'>) => {
			cx.$draftName.set(event.currentTarget.value);
		},
		[cx]
	);

	const handleSubmit = React.useCallback(
		async (event: React.SubmitEvent<HTMLFormElement>) => {
			event.preventDefault();
			const [isItemOk, itemErr] = await cx.addItem();
			if (!isItemOk) {
				console.error('Failed to add shopping item', itemErr);
			}
		},
		[cx]
	);

	return (
		<form className="flex flex-col gap-3 sm:flex-row sm:items-center" onSubmit={handleSubmit}>
			<div className="min-w-0 flex-1">
				<s-text-field
					autocomplete="off"
					disabled={isAdding}
					label="Product name"
					labelAccessibilityVisibility="exclusive"
					name="productName"
					placeholder="Product name"
					value={draftName}
					onInput={handleDraftInput}
				/>
			</div>
			<s-button
				disabled={isAdding || !draftName.trim().length}
				icon="plus"
				loading={isAdding}
				type="submit"
				variant="primary"
			>
				Add item
			</s-button>
		</form>
	);
};

interface TAddItemFormProps {
	cx: ShoppingListCx;
}

const ShoppingItemRow: React.FC<TShoppingItemRowProps> = (props) => {
	const { cx, item, onItemBoughtChange } = props;
	const isPending = useCompute(cx.$pendingItemIds, (itemIds) => itemIds.includes(item.id), [
		item.id
	]);

	const handleBoughtChange = React.useCallback(
		(event: CallbackEvent<'s-checkbox'>) => {
			void onItemBoughtChange(item.id, event.currentTarget.checked);
		},
		[item.id, onItemBoughtChange]
	);

	const handleDelete = React.useCallback(async () => {
		const [isItemDeleted, itemDeleteErr] = await cx.deleteItem(item.id);
		if (!isItemDeleted) {
			console.error('Failed to delete shopping item', itemDeleteErr);
		}
	}, [cx, item.id]);

	return (
		<li aria-busy={isPending} className="group flex items-center gap-3 px-3 py-3">
			<s-checkbox
				accessibilityLabel={`${item.name} bought`}
				checked={item.bought}
				disabled={isPending}
				onChange={handleBoughtChange}
			/>
			<span
				className={cn(
					'min-w-0 flex-1 text-base leading-5 wrap-break-word sm:text-sm',
					item.bought && 'text-black/45 line-through'
				)}
			>
				{item.name}
			</span>
			<div className="sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:focus-within:opacity-100">
				<s-button
					accessibilityLabel={`Remove ${item.name}`}
					disabled={isPending}
					icon="x"
					tone="neutral"
					variant="tertiary"
					onClick={handleDelete}
				/>
			</div>
		</li>
	);
};

interface TShoppingItemRowProps {
	cx: ShoppingListCx;
	item: TShoppingItem;
	onItemBoughtChange: (itemId: string, bought: boolean) => Promise<void>;
}
