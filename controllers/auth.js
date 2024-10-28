const userService = require('../services/user.service');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userService.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user", error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await userService.update(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(400).json({ message: "Failed to update user", error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const deletedUser = await userService.delete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user", error: error.message });
    }
  }

  async register(req, res) {
    try {
      const newUser = await userService.register(req.body);
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(400).json({ message: "Registration failed", error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { token, user } = await userService.login(req.body);
      res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }  
}

module.exports = new UserController();
