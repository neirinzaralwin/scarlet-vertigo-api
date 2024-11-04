import Product, { ProductDocument } from '../models/product';
import ProductImage, { IProductImage } from '../models/product-image'; 
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

interface ImageUploadInput {
  productId: mongoose.Types.ObjectId;
  url: string;
}

class ProductRepository {
  async create(productData: ProductData): Promise<ProductDocument> {
    const product = new Product(productData);
    return await product.save();
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

  async uploadImage(imageData: ImageUploadInput): Promise<IProductImage> {
    try {
      const { productId, url } = imageData;

      const productImage = new ProductImage({
        productId,
        url,
      });
      return await productImage.save();
    } catch (error) {
      console.error("Error uploading image URL:", error);
      throw new Error("Failed to upload image URL");
    }
  }
}

export default new ProductRepository();
