import sizeRepository from '../../infrastructure/repositories/size.repository';

class SizeService {
  async create(name: string): Promise<any> {
    return await sizeRepository.create(name);
  }

  async findAll(): Promise<any[]> {
    return await sizeRepository.findAll();
  }

  async findById(id: string): Promise<any> {
    const size = await sizeRepository.findById(id);
    if (!size) {
      throw new Error('Size not found');
    }
    return size;
  }

  async update(id: string, name: string): Promise<any> {
    const updatedSize = await sizeRepository.update(id, name);
    if (!updatedSize) {
      throw new Error('Size not found');
    }
    return updatedSize;
  }

  async delete(id: string): Promise<any> {
    const deletedSize = await sizeRepository.delete(id);
    if (!deletedSize) {
      throw new Error('Size not found');
    }
    return deletedSize;
  }
}

export default new SizeService();
