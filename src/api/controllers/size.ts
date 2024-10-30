import { Request, Response } from 'express';
import sizeService from '../../domain/services/size.service';

class SizeController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body; 
      if (typeof name !== 'string') {
        throw new Error("Invalid input: 'name' must be a string.");
      }
      const size = await sizeService.create(name); 
      res.status(200).json({message: "Size is created successfully", size:size});
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const size = await sizeService.findById(req.params.id);
      res.status(200).json(size);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const sizes = await sizeService.findAll();
      res.status(200).json(sizes);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const size = await sizeService.update(req.params.id, req.body.name);
      res.status(200).json(size);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await sizeService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}

export default new SizeController();
