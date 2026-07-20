import { createFileRoute } from '@tanstack/react-router';
import { apiClient, appConfig } from '@/environment';
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
			<header className="mb-6 px-4 sm:px-0">
				<img alt="" className="mb-5 size-12 rounded-xl" src="/logo192.png" />
				<h1 className="flex items-baseline gap-2 text-3xl font-bold tracking-tight">
					{appConfig.name}
					<span className="text-xs font-normal tracking-normal text-black/45">
						{appConfig.version}
					</span>
				</h1>
				<p className="mt-2 max-w-xl text-sm leading-5 text-black/60">
					Keep track of the products and supplies your business needs to restock.
				</p>
			</header>

			<ShoppingList cx={cx} />
		</main>
	);
}
