import userRepository from '../../infrastructure/repositories/user.repository';
import { IUser } from '../../infrastructure/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface LoginResponse {
  token: string;
  user: IUser;
}

class UserService {
  async findAll(): Promise<IUser[]> {
    return userRepository.findAll();
  }

  async findById(id: string): Promise<IUser | null> {
    return userRepository.findById(id);
  }

  async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    return userRepository.update(id, userData);
  }

  async delete(id: string): Promise<IUser | null> {
    return userRepository.delete(id);
  }

  async register(userData: Partial<IUser>): Promise<IUser> {
    const { role, password } = userData;
    const allowedRoles = ["Admin", "User", "Moderator"];
    userData.role = allowedRoles.includes(role as string) ? role : "User";

    userData.password = await bcrypt.hash(password!, 10);

    return userRepository.create(userData as IUser);
  }

  async login({ email, password }: { email: string; password: string }): Promise<LoginResponse> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role }, 
      process.env.JWT_KEY as string,
      { expiresIn: '1h' }
    );

    return { token, user };
  }
}

export default new UserService();
