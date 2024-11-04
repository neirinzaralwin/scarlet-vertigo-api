import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductImage extends Document {
  productId: mongoose.Types.ObjectId;
  url: string;
}

const productImageSchema: Schema<IProductImage> = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  url: { type: String, required: true },
});

const ProductImage: Model<IProductImage> = mongoose.model<IProductImage>('ProductImage', productImageSchema);

export default ProductImage;
