import categoryRepository from "../../../infrastructure/repositories/category.repository";

class CategoryService {
  async create(name: string): Promise<any> {
    return await categoryRepository.create(name);
  }

  async findAll(): Promise<any[]> {
    return await categoryRepository.findAll();
  }

  async findById(id: string): Promise<any> {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  async update(id: string, name: string): Promise<any> {
    const updatedCategory = await categoryRepository.update(id, name);
    if (!updatedCategory) {
      throw new Error("Category not found");
    }
    return updatedCategory;
  }

  async delete(id: string): Promise<any> {
    const deletedCategory = await categoryRepository.delete(id);
    if (!deletedCategory) {
      throw new Error("Category not found");
    }
    return deletedCategory;
  }
}

export default new CategoryService();
