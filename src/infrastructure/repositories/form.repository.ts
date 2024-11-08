import Form, { IForm } from '../models/RequestForm'; 
import { Document, Types } from 'mongoose';

class FormRepository {
  // Create a new form
  async create(userId: Types.ObjectId, title: string, message: string): Promise<IForm> {
    const form = new Form({ userId, title, message });
    return await form.save();
  }

  // Find all forms
  async findAll(): Promise<IForm[]> {
    return await Form.find().populate('userId', 'username'); 
  }

  // Find a form by ID
  async findById(id: string): Promise<IForm | null> {
    return await Form.findById(id).populate('userId', 'username'); 
  }

  // Update a form by ID
  async update(id: string, title: string, message: string): Promise<IForm | null> {
    return await Form.findByIdAndUpdate(id, { title, message }, { new: true });
  }

  // Delete a form by ID
  async delete(id: string): Promise<IForm | null> {
    return await Form.findByIdAndDelete(id);
  }
}

export default new FormRepository();
