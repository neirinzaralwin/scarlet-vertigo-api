import mongoose, { Document, Schema, Model } from 'mongoose';

export interface NewsDocument extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  imageIds: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new Schema<NewsDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageIds: [{ type: Schema.Types.ObjectId, ref: 'Image' }], 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

newsSchema.virtual('imageUrls', {
  ref: 'Image',
  localField: 'imageIds',
  foreignField: '_id',
  justOne: false,
  options: { select: 'url' },
});

newsSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  }
});

newsSchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  }
});

const News: Model<NewsDocument> = mongoose.model<NewsDocument>('News', newsSchema);

export default News;
