import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IForm extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  message: string;
}

const formSchema: Schema<IForm> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
});

const Form: Model<IForm> = mongoose.model<IForm>('Form', formSchema);

export default Form;
