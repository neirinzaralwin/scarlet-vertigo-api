import Category, { ICategory } from '../models/category/category';
import { Document, Types } from 'mongoose';

class CategoryRepository {
  async create(name: string): Promise<ICategory> {
    const category = new Category({ name });
    return await category.save();
  }

  async findAll(): Promise<ICategory[]> {
    return await Category.find();
  }

  async findById(id: string): Promise<ICategory | null> {
    return await Category.findById(id);
  }

  async update(id: string, name: string): Promise<ICategory | null> {
    return await Category.findByIdAndUpdate(id, { name }, { new: true });
  }

  async delete(id: string): Promise<ICategory | null> {
    return await Category.findByIdAndDelete(id);
  }
}

export default new CategoryRepository();
