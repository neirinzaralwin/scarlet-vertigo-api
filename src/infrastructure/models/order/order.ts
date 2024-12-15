import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  totalPrice: mongoose.Types.Decimal128;
  status: string;
  orderProductId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type PublicOrder = Omit<IOrder, 'userId' | 'orderProductId'>;

const orderSchema: Schema<IOrder> = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalPrice: { type: mongoose.Types.Decimal128, required: true },
    status: { type: String, required: true },
    orderProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderProduct' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

orderSchema.methods.toPublicOrder = function (): PublicOrder {
  const { userId, orderProductId, ...publicFields } = this.toObject();
  return publicFields;
};

const Order: Model<IOrder> = mongoose.model<IOrder>('Order', orderSchema);
export default Order;
