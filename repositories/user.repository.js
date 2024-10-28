const userModel = require('../models/user');

class UserRepository {
  async findAll() {
    return userModel.find(); 
  }

  async findById(id) {
    return userModel.findById(id); 
  }

  async create(userData) {
    const allowedRoles = ["Admin", "User", "Moderator"];
    if (!userData.role || !allowedRoles.includes(userData.role)) {
      userData.role = "User"; 
    }

    const newUser = new userModel(userData); 
    return newUser.save(); 
  }

  async update(id, userData) {
    const allowedRoles = ["Admin", "User", "Moderator"];
    if (userData.role && !allowedRoles.includes(userData.role)) {
      throw new Error("Invalid role provided");
    }

    return userModel.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id) {
    return userModel.findByIdAndDelete(id); 
  }

  async findByEmail(email) {
    return userModel.findOne({ email }); 
  }
}

module.exports = new UserRepository();
