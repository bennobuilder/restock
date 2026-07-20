import { model, Schema } from 'mongoose';

const shoppingItemSchema = new Schema<TShoppingItem>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 1
		},
		bought: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{
		collection: 'shopping_items',
		timestamps: {
			createdAt: true,
			updatedAt: false
		},
		toJSON: {
			transform: (_document, value) => {
				const { _id, ...item } = value;
				return {
					...item,
					id: _id.toString()
				};
			}
		},
		versionKey: false
	}
);

export const ShoppingItemModel = model<TShoppingItem>('ShoppingItem', shoppingItemSchema);

export interface TShoppingItem {
	name: string;
	bought: boolean;
	createdAt: Date;
}
