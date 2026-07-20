import type { HydratedDocument } from 'mongoose';
import { z } from 'zod';
import { ShoppingItemModel, type TShoppingItem } from '@/environment';
import { AppError } from '@/modules/error';
import type { apiV1 } from '@/openapi';
import type { TApiRouter } from '..';

export function registerItemsRoutes(router: TApiRouter): void {
	router.get('/items', {
		handler: async (_request, response) => {
			const items = await ShoppingItemModel.find().sort({ createdAt: 1, _id: 1 });

			response.status(200).json(items.map(toShoppingItemResponse));
		}
	});

	router.post('/items', {
		bodySchema: z.object({
			name: z.string().trim().min(1)
		}),
		handler: async (request, response) => {
			const item = await ShoppingItemModel.create({ name: request.valid.body.name });

			response.status(201).json(toShoppingItemResponse(item));
		}
	});

	router.put('/items/{id}', {
		pathParamParser: false,
		pathSchema: z.object({
			id: z.string().regex(/^[0-9a-f]{24}$/i)
		}),
		bodySchema: z.object({
			bought: z.boolean()
		}),
		handler: async (request, response) => {
			const { id } = request.valid.path;
			const item = await ShoppingItemModel.findByIdAndUpdate(
				id,
				{ $set: { bought: request.valid.body.bought } },
				{ returnDocument: 'after', runValidators: true }
			);
			if (item == null) {
				throw new AppError('#ERR_SHOPPING_ITEM_NOT_FOUND', {
					status: 404,
					title: 'Not Found',
					detail: `The shopping item '${id}' does not exist`
				});
			}

			response.status(200).json(toShoppingItemResponse(item));
		}
	});

	router.delete('/items/{id}', {
		pathParamParser: false,
		pathSchema: z.object({
			id: z.string().regex(/^[0-9a-f]{24}$/i)
		}),
		handler: async (request, response) => {
			const { id } = request.valid.path;
			const item = await ShoppingItemModel.findByIdAndDelete(id);
			if (item == null) {
				throw new AppError('#ERR_SHOPPING_ITEM_NOT_FOUND', {
					status: 404,
					title: 'Not Found',
					detail: `The shopping item '${id}' does not exist`
				});
			}

			response.status(204).end();
		}
	});
}

function toShoppingItemResponse(
	item: HydratedDocument<TShoppingItem>
): apiV1.components['schemas']['ShoppingItem'] {
	return {
		id: item._id.toString(),
		name: item.name,
		bought: item.bought,
		createdAt: item.createdAt.toISOString()
	};
}
