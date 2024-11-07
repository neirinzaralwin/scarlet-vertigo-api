import { Request, Response } from 'express';
import productService from '../../domain/services/product.service';
import imageService from '../../domain/services/image.service'; 
import path from 'path';
import mongoose from 'mongoose';

class ProductController {
  // Create
  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const productData = req.body;
      const imagePath = req.file ? path.join('images', req.file.filename) : undefined;
  
      const product = await productService.create(productData, imagePath);
  
      return res.status(201).json(product);
    } catch (error: any) {
      console.error('Error creating product:', error);
      return res.status(500).json({ message: 'Error creating product', error: error.message });
    }
  }    

  // Get all products
  async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const publicProducts = await productService.findAll();
      return res.status(200).json(publicProducts);
    } catch (error: any) {
      console.error('Error retrieving products:', error);
      return res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
  }  

  // Get a product by ID
  async getProductById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const publicProduct = await productService.findById(id);
      if (!publicProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(publicProduct);
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
      const publicProduct = await productService.update(id, productData);
      if (!publicProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(publicProduct);
    } catch (error: any) {
      console.error('Error updating product:', error);
      return res.status(500).json({ message: 'Error updating product', error: error.message });
    }
  }  

  // Delete a product
  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const publicProduct = await productService.delete(id);
      if (!publicProduct) {
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
