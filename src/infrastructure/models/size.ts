import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISize extends Document {
  name: string;
}

const sizeSchema: Schema<ISize> = new Schema({
  name: { type: String, required: true, maxlength: 30 },
});

const Size: Model<ISize> = mongoose.model<ISize>('Size', sizeSchema);

export default Size;
