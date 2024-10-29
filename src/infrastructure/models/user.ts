import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;  
  roleId: number;
  role: "Admin" | "User" | "Moderator";
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    roleId: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "User", "Moderator"],
      default: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
      validate: {
        validator: function (value: string) {
          const alphabetRegex = /^[a-zA-Z\s]+$/;
          return alphabetRegex.test(value);
        },
        message: "Name must contain only alphabets and spaces.",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Invalid email format.",
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  {
    timestamps: true, 
  }
);

const userModel = model<IUser>("User", userSchema);

export default userModel;
