import Product, { ProductDocument, ProductPublicDocument } from '../../infrastructure/models/product';

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
  async create(productData: ProductData): Promise<ProductPublicDocument> {
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    return this.toPublicDocument(savedProduct);
  }

  async findAll(): Promise<ProductPublicDocument[]> {
    const products = await Product.find();
    return products.map((product) => this.toPublicDocument(product));
  }

  async findById(id: string): Promise<ProductPublicDocument | null> {
    const product = await Product.findById(id);
    return product ? this.toPublicDocument(product) : null;
  }

  async update(id: string, productData: ProductData): Promise<ProductPublicDocument | null> {
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
    return updatedProduct ? this.toPublicDocument(updatedProduct) : null;
  }

  async delete(id: string): Promise<ProductPublicDocument | null> {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return deletedProduct ? this.toPublicDocument(deletedProduct) : null;
  }

  toPublicDocument(product: ProductDocument): ProductPublicDocument {
    const { categoryId, sizeId, createdAt, updatedAt, ...publicProduct } = product.toObject();
    return publicProduct as ProductPublicDocument;
  }
}

export default new ProductService();
