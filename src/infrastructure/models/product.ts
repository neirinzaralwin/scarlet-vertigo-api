import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ProductDocument extends Document {
  categoryId: mongoose.Types.ObjectId;
  sizeId?: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  thc?: number;
  stv?: number;
  ind?: number;
  sku?: string;
  price: mongoose.Types.Decimal128;
  stock?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductPublicDocument = Omit<ProductDocument, 'categoryId' | 'sizeId' | 'createdAt' | 'updatedAt'>;

const productSchema = new Schema<ProductDocument>({
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  sizeId: { type: Schema.Types.ObjectId, ref: 'Size' },
  name: { type: String, required: true },
  description: { type: String },
  thc: { type: Number },
  stv: { type: Number },
  ind: { type: Number },
  sku: { type: String },
  price: { type: mongoose.Types.Decimal128, required: true },
  stock: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product: Model<ProductDocument> = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;
