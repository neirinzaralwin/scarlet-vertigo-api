import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema: Schema<ICart> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Cart: Model<ICart> = mongoose.model<ICart>('Cart', cartSchema);

export default Cart;
