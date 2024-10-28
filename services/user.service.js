const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  async findAll() {
    return userRepository.findAll();
  }

  async findById(id) {
    return userRepository.findById(id);
  }
  
  async update(id, userData) {
    return userRepository.update(id, userData);
  }

  async delete(id) {
    return userRepository.delete(id);
  }

  async register(userData) {
    const { role, password } = userData;

    const allowedRoles = ["Admin", "User", "Moderator"];
    userData.role = allowedRoles.includes(role) ? role : "User";

    userData.password = await bcrypt.hash(password, 10);

    return userRepository.create(userData);
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
  
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: '1h' });
  
    return { token, user }; 
  }
}  

module.exports = new UserService();
