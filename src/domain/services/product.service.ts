import Product, { ProductDocument } from '../../infrastructure/models/product';

interface ProductData {
  categoryId: string;
  sizeId?: string;
  name: string;
  description?: string;
  thc?: number;
  stv?: number;
  ind?: number;
  sku?: string;
  price: number;
  stock?: number;
}

class ProductService {
  async create(productData: ProductData): Promise<ProductDocument> {
    const newProduct = new Product(productData);
    return await newProduct.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return await Product.find();
  }

  async findById(id: string): Promise<ProductDocument | null> {
    return await Product.findById(id);
  }

  async update(id: string, productData: ProductData): Promise<ProductDocument | null> {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  }

  async delete(id: string): Promise<ProductDocument | null> {
    return await Product.findByIdAndDelete(id);
  }
}

export default new ProductService();
