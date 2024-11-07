import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IImage extends Document {
  _id: mongoose.Types.ObjectId; 
  url: string;
}

const imageSchema: Schema<IImage> = new Schema({
  url: { type: String, required: true },
});

const Image: Model<IImage> = mongoose.model<IImage>('Image', imageSchema);

export default Image;
