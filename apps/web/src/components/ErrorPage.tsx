import type { ErrorComponentProps } from '@tanstack/react-router';
import React from 'react';
import { AppHeader } from './AppHeader';

export const ErrorPage: React.FC<ErrorComponentProps> = () => {
	const handleReload = React.useCallback(() => {
		window.location.reload();
	}, []);

	return (
		<main className="mx-auto min-h-screen w-full max-w-3xl py-10 sm:px-6 sm:py-16">
			<AppHeader />
			<s-banner heading="We couldn't load your shopping list" tone="critical">
				<s-paragraph>
					Restock is temporarily unable to retrieve your items. Reload the page and try again.
				</s-paragraph>
				<s-button slot="secondary-actions" variant="secondary" onClick={handleReload}>
					Reload page
				</s-button>
			</s-banner>
		</main>
	);
};
