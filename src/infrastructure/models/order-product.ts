import mongoose from 'mongoose';

const orderProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: mongoose.Types.Decimal128, required: true },
});

export default mongoose.model('OrderProduct', orderProductSchema);
