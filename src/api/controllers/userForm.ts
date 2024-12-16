import { Request, Response } from "express";
import formService from "../../domain/services/form.service";

class FormController {
  // Create a new form
  async create(req: Request, res: Response) {
    try {
      const { userId, title, message } = req.body;
      const form = await formService.create(userId, title, message);
      res.status(201).json(form);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error creating form",
          error: (error as Error).message,
        });
    }
  }

  // Get all forms
  async findAll(req: Request, res: Response) {
    try {
      const forms = await formService.findAll();
      res.status(200).json(forms);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error retrieving forms",
          error: (error as Error).message,
        });
    }
  }

  // Get a form by ID
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const form = await formService.findById(id);
      res.status(200).json(form);
    } catch (error) {
      res
        .status(404)
        .json({ message: "Form not found", error: (error as Error).message });
    }
  }

  // Update a form by ID
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, message } = req.body;
      const updatedForm = await formService.update(id, title, message);
      res.status(200).json(updatedForm);
    } catch (error) {
      res
        .status(404)
        .json({ message: "Form not found", error: (error as Error).message });
    }
  }

  // Delete a form by ID
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedForm = await formService.delete(id);
      res.status(200).json(deletedForm);
    } catch (error) {
      res
        .status(404)
        .json({ message: "Form not found", error: (error as Error).message });
    }
  }
}

export default new FormController();
