import { Request, Response } from 'express';
import categoryService from '../../domain/services/category.service';

class CategoryController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body; 
      if (typeof name !== 'string') {
        throw new Error("Invalid input: 'name' must be a string.");
      }
      const category = await categoryService.create(name); 
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const category = await categoryService.findById(req.params.id);
      res.status(200).json(category);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const categories = await categoryService.findAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const category = await categoryService.update(req.params.id, req.body.name);
      res.status(200).json(category);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await categoryService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}

export default new CategoryController();
