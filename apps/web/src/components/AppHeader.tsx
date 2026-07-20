import React from 'react';
import { appConfig } from '@/environment';

export const AppHeader: React.FC = () => {
	return (
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
	);
};
