import Size, { ISize } from '../models/size';
import { Document, Types } from 'mongoose';

class SizeRepository {
  async create(name: string): Promise<ISize> {
    const size = new Size({ name });
    return await size.save();
  }

  async findAll(): Promise<ISize[]> {
    return await Size.find();
  }

  async findById(id: string): Promise<ISize | null> {
    return await Size.findById(id);
  }

  async update(id: string, name: string): Promise<ISize | null> {
    return await Size.findByIdAndUpdate(id, { name }, { new: true });
  }

  async delete(id: string): Promise<ISize | null> {
    return await Size.findByIdAndDelete(id);
  }
}

export default new SizeRepository();
