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
  imageIds?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  imageUrls?: string[];  
}

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
  imageIds: [{ type: Schema.Types.ObjectId, ref: 'Image' }],  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

productSchema.virtual('imageUrls', {
  ref: 'Image',
  localField: 'imageIds',
  foreignField: '_id',
  justOne: false,
  options: { select: 'url' },  
});

productSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.categoryId;
    delete ret.sizeId;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;  
    return ret;
  }
});

productSchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.categoryId;
    delete ret.sizeId;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v; 
    return ret;
  }
});

const Product: Model<ProductDocument> = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;
