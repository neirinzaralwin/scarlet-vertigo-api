import userModel, { IUser } from '../models/user';

class UserRepository {
  // Fetches all user documents
  async findAll(): Promise<IUser[]> {
    return userModel.find();
  }

  // Finds a single user by their ID
  async findById(id: string): Promise<IUser | null> {
    return userModel.findById(id);
  }

  // Creates a new user with validation for allowed roles
  async create(userData: Partial<IUser>): Promise<IUser> {
    const allowedRoles = ["Admin", "User", "Moderator"];
    
    // Set default role if not provided or invalid
    if (!userData.role || !allowedRoles.includes(userData.role)) {
      userData.role = "User";
    }

    const newUser = new userModel(userData);
    return newUser.save();
  }

  // Updates user information by ID, with role validation
  async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    const allowedRoles = ["Admin", "User", "Moderator"];
    
    // Validate role if provided
    if (userData.role && !allowedRoles.includes(userData.role)) {
      throw new Error("Invalid role provided");
    }

    return userModel.findByIdAndUpdate(id, userData, { new: true });
  }

  // Deletes a user by ID
  async delete(id: string): Promise<IUser | null> {
    return userModel.findByIdAndDelete(id);
  }

  // Finds a user by their email
  async findByEmail(email: string): Promise<IUser | null> {
    return userModel.findOne({ email });
  }
}

export default new UserRepository();
