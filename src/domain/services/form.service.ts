import formRepository from "../../infrastructure/repositories/form.repository";
import { IForm } from "../../infrastructure/models/requestForm";
import { Types } from "mongoose";

class FormService {
  // Create a new form
  async create(userId: string, title: string, message: string): Promise<IForm> {
    return await formRepository.create(
      new Types.ObjectId(userId),
      title,
      message
    );
  }

  // Find all forms
  async findAll(): Promise<IForm[]> {
    return await formRepository.findAll();
  }

  // Find a form by ID
  async findById(id: string): Promise<IForm> {
    const form = await formRepository.findById(id);
    if (!form) {
      throw new Error("Form not found");
    }
    return form;
  }

  // Update a form by ID
  async update(id: string, title: string, message: string): Promise<IForm> {
    const updatedForm = await formRepository.update(id, title, message);
    if (!updatedForm) {
      throw new Error("Form not found");
    }
    return updatedForm;
  }

  // Delete a form by ID
  async delete(id: string): Promise<IForm> {
    const deletedForm = await formRepository.delete(id);
    if (!deletedForm) {
      throw new Error("Form not found");
    }
    return deletedForm;
  }
}

export default new FormService();
