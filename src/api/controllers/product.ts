import { Request, Response } from 'express';
import productService from '../../domain/services/product.service';

class ProductController {
  // Create a new product
  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const productData = req.body;
      const newProduct = await productService.create(productData);
      return res.status(201).json(newProduct);
    } catch (error: any) {
      console.error('Error creating product:', error);
      return res.status(500).json({ message: 'Error creating product', error: error.message });
    }
  }

  // Get all products
  async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await productService.findAll();
      return res.status(200).json(products);
    } catch (error: any) {
      console.error('Error retrieving products:', error);
      return res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
  }

  // Get a product by ID
  async getProductById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const product = await productService.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    } catch (error: any) {
      console.error('Error retrieving product:', error);
      return res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
  }

  // Update a product
  async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const productData = req.body;
      const updatedProduct = await productService.update(id, productData);
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(updatedProduct);
    } catch (error: any) {
      console.error('Error updating product:', error);
      return res.status(500).json({ message: 'Error updating product', error: error.message });
    }
  }

  // Delete a product
  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deletedProduct = await productService.delete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(204).send();
    } catch (error: any) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
  }
}

export default new ProductController();
