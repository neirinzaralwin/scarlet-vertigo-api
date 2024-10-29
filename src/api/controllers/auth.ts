import { Request, Response } from 'express';
import userService from '../../domain/services/user.service';

class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users", error: (error as Error).message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.findById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return; 
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user", error: (error as Error).message });
    }
  }
  
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser = await userService.update(req.params.id, req.body);
      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(400).json({ message: "Failed to update user", error: (error as Error).message });
    }
  }
  
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const deletedUser = await userService.delete(req.params.id);
      if (deletedUser === undefined) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user", error: (error as Error).message });
    }
  }
  
  async register(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await userService.register(req.body);
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(400).json({ message: "Registration failed", error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { token, user } = await userService.login(req.body);
      res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
      res.status(401).json({ message: (error as Error).message });
    }
  }  
}

export default new UserController();
