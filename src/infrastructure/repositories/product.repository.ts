import Product, { ProductDocument } from '../models/product';
import Image, { IImage } from '../models/image';
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
  url: string;
}

class ProductRepository {
  async create(productData: ProductData, imageIds: mongoose.Types.ObjectId[]): Promise<ProductDocument> {
    const product = new Product({
      ...productData,
      imageIds, 
    });
    return await product.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return await Product.find().populate('imageUrls', 'url');
  }  

  async findById(id: string): Promise<ProductDocument | null> {
    return await Product.findById(id).populate('imageUrls', 'url');
  }  

  async update(id: string, productData: ProductData): Promise<ProductDocument | null> {
    return await Product.findByIdAndUpdate(id, productData, { new: true }).populate('imageUrls', 'url');
  }  

  async delete(id: string): Promise<ProductDocument | null> {
    const product = await Product.findById(id).populate('imageUrls', 'url');
    if (product) {
      await Product.findByIdAndDelete(id);
    }
    return product;
  }  

  async uploadImage(imageData: ImageUploadInput): Promise<IImage> {
    try {
      const { url } = imageData;

      const productImage = new Image({ url });
      return await productImage.save();
    } catch (error) {
      throw new Error("Failed to upload image URL");
    }
  }
}

export default new ProductRepository();
