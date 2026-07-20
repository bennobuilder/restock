import { createFileRoute } from '@tanstack/react-router';
import { appConfig } from '@/environment';
import { ShoppingList, useCreateShoppingListCx } from '@/modules/shopping-list';

export const Route = createFileRoute('/')({
	component: RouteComponent
});

function RouteComponent() {
	const cx = useCreateShoppingListCx();

	return (
		<main className="mx-auto min-h-screen w-full max-w-3xl py-10 sm:px-6 sm:py-16">
			<header className="mb-6 px-4 sm:px-0">
				<img alt="" className="mb-5 size-12 rounded-xl" src="/logo192.png" />
				<h1 className="text-3xl font-bold tracking-tight">{appConfig.name}</h1>
				<p className="mt-2 max-w-xl text-sm leading-5 text-black/60">
					Keep track of the products and supplies your business needs to restock.
				</p>
			</header>

			<ShoppingList cx={cx} />
		</main>
	);
}
