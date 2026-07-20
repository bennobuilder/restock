import { createFileRoute } from '@tanstack/react-router';
import { AppHeader } from '@/components';
import { apiClient } from '@/environment';
import { ShoppingList, useCreateShoppingListCx } from '@/modules/shopping-list';

export const Route = createFileRoute('/')({
	loader: async () => {
		const [isItemsOk, itemsErr, items] = await apiClient.get('/items');
		if (!isItemsOk) {
			throw itemsErr;
		}

		return { items };
	},
	component: RouteComponent
});

function RouteComponent() {
	const { items } = Route.useLoaderData();
	const cx = useCreateShoppingListCx(items);

	return (
		<main className="mx-auto min-h-screen w-full max-w-3xl py-10 sm:px-6 sm:py-16">
			<AppHeader />
			<ShoppingList cx={cx} />
		</main>
	);
}
