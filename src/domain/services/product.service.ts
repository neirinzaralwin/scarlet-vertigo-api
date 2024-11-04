import ProductRepository from '../../infrastructure/repositories/product.repository';
import { ProductPublicDocument, ProductDocument } from '../../infrastructure/models/product';
import mongoose from 'mongoose';

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
  async create(productData: ProductData, imagePath?: string): Promise<ProductPublicDocument> {
    // Create the product
    const newProduct: ProductDocument = await ProductRepository.create(productData);

    if (imagePath) {
      const imageUploadInput = {
        productId: newProduct._id as mongoose.Types.ObjectId, 
        url: imagePath,
      };
      await ProductRepository.uploadImage(imageUploadInput);
    }

    return this.toPublicDocument(newProduct);
  }

  async findAll(): Promise<ProductPublicDocument[]> {
    const products = await ProductRepository.findAll();
    return products.map((product) => this.toPublicDocument(product));
  }

  async findById(id: string): Promise<ProductPublicDocument | null> {
    const product = await ProductRepository.findById(id);
    return product ? this.toPublicDocument(product) : null;
  }

  async update(id: string, productData: ProductData): Promise<ProductPublicDocument | null> {
    const updatedProduct = await ProductRepository.update(id, productData);
    return updatedProduct ? this.toPublicDocument(updatedProduct) : null;
  }

  async delete(id: string): Promise<ProductPublicDocument | null> {
    const deletedProduct = await ProductRepository.delete(id);
    return deletedProduct ? this.toPublicDocument(deletedProduct) : null;
  }

  toPublicDocument(product: ProductDocument): ProductPublicDocument {
    const { categoryId, sizeId, createdAt, updatedAt, ...publicProduct } = product.toObject();
    return publicProduct as ProductPublicDocument;
  }
}

export default new ProductService();
