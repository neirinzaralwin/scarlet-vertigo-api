import ProductRepository from "../../../infrastructure/repositories/product.repository";
import Product, {
  ProductDocument,
} from "../../../infrastructure/models/product/product";
import mongoose from "mongoose";

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
  // Create a new product
  async create(
    productData: ProductData,
    imagePath?: string
  ): Promise<Partial<ProductDocument>> {
    let imageIds: mongoose.Types.ObjectId[] = [];

    if (imagePath) {
      const image = await ProductRepository.uploadImage({ url: imagePath });
      imageIds.push(image._id);
    }

    const newProduct = await ProductRepository.create(productData, imageIds);

    const populatedProduct = await Product.findById(newProduct._id).populate(
      "imageUrls",
      "url"
    );

    return populatedProduct?.toJSON() as Partial<ProductDocument>;
  }

  // Get all products
  async findAll(): Promise<Partial<ProductDocument>[]> {
    const products = await ProductRepository.findAll();
    const populatedProducts = await Product.populate(products, {
      path: "imageUrls",
      select: "url",
    });
    return populatedProducts.map(
      (product) => product.toJSON() as Partial<ProductDocument>
    );
  }

  // Get a product by ID
  async findById(id: string): Promise<Partial<ProductDocument> | null> {
    const product = await ProductRepository.findById(id);
    if (product) {
      await product.populate("imageUrls", "url");
    }
    return product ? (product.toJSON() as Partial<ProductDocument>) : null;
  }

  // Update a product
  async update(
    id: string,
    productData: ProductData
  ): Promise<Partial<ProductDocument> | null> {
    await ProductRepository.update(id, productData);
    const updatedProduct = await Product.findById(id).populate(
      "imageUrls",
      "url"
    );
    return updatedProduct
      ? (updatedProduct.toJSON() as Partial<ProductDocument>)
      : null;
  }

  // Delete a product
  async delete(id: string): Promise<Partial<ProductDocument> | null> {
    const deletedProduct = await ProductRepository.findById(id);
    if (deletedProduct) {
      await deletedProduct.populate("imageUrls", "url");
      await Product.findByIdAndDelete(id);
    }
    return deletedProduct
      ? (deletedProduct.toJSON() as Partial<ProductDocument>)
      : null;
  }
}

export default new ProductService();
