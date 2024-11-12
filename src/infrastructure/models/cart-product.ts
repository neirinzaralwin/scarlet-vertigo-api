import mongoose from 'mongoose';

const cartProductSchema = new mongoose.Schema({
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: mongoose.Types.Decimal128, required: true },
});

export default mongoose.model('CartProduct', cartProductSchema);
