import userModel, { IUser } from '../models/user';

class UserRepository {
  async findAll(): Promise<IUser[]> {
    return userModel.find();
  }

  async findById(id: string): Promise<IUser | null> {
    return userModel.findById(id);
  }

  async create(userData: Partial<IUser>): Promise<IUser> {
    const allowedRoles = ["Admin", "User", "Moderator"];
    
    if (!userData.role || !allowedRoles.includes(userData.role)) {
      userData.role = "User";
    }

    const newUser = new userModel(userData);
    return newUser.save();
  }

  async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    const allowedRoles = ["Admin", "User", "Moderator"];
    
    if (userData.role && !allowedRoles.includes(userData.role)) {
      throw new Error("Invalid role provided");
    }

    return userModel.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id: string): Promise<IUser | null> {
    return userModel.findByIdAndDelete(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return userModel.findOne({ email });
  }
}

export default new UserRepository();
