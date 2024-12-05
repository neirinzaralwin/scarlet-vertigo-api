import userModel, { IUser } from "../models/user";
import { USER_ROLE, RoleType } from "../../constants/role";

class UserRepository {
  async findAll(): Promise<IUser[]> {
    return userModel.find();
  }

  async findById(id: string): Promise<IUser | null> {
    return userModel.findById(id);
  }

  async create(userData: Partial<IUser>): Promise<IUser> {
    const allowedRoles = Object.values(USER_ROLE) as RoleType[];

    if (!userData.role || !allowedRoles.includes(userData.role)) {
      userData.role = USER_ROLE.customer;
    }

    const newUser = new userModel(userData);
    return newUser.save();
  }

  async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    const allowedRoles = Object.values(USER_ROLE) as RoleType[];

    if (userData.role && !allowedRoles.includes(userData.role)) {
      throw new Error("Invalid role provided");
    }

    return userModel.findByIdAndUpdate(id, userData, { new: false });
  }

  async delete(id: string): Promise<IUser | null> {
    return userModel.findByIdAndDelete(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return userModel.findOne({ email });
  }
}

export default new UserRepository();
