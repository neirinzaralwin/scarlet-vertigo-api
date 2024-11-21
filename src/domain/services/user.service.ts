import userRepository from "../../infrastructure/repositories/user.repository";
import { IUser, omitSensitiveFields } from "../../infrastructure/models/user";
import { USER_ROLE, RoleType } from "../../constants/role";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginResponse {
  token: string;
  user: Partial<IUser>; // Use Partial<IUser> to reflect omitted fields
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
    const allowedRoles = Object.values(USER_ROLE) as RoleType[];

    userData.role = allowedRoles.includes(role as RoleType)
      ? role
      : USER_ROLE.customer;

    userData.password = await bcrypt.hash(password!, 10);

    return userRepository.create(userData as IUser);
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    let user: IUser | null = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password ?? "");
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_KEY as string,
      { expiresIn: "1h" }
    );

    // Omit sensitive fields
    const userWithoutSensitiveFields = omitSensitiveFields(user);

    return { token, user: userWithoutSensitiveFields };
  }
}

export default new UserService();
