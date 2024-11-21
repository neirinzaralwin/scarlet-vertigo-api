import { model, Schema, Document, Types } from "mongoose";
import { RoleType, USER_ROLE } from "../../constants/role";
import { omit } from "lodash";

export interface IUser extends Document {
  _id: string;
  roleId: number;
  role: RoleType;
  name: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  carts?: Types.ObjectId[];
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
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.customer,
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
    carts: [{ type: Types.ObjectId, ref: "Cart" }],
  },
  {
    timestamps: true,
  }
);

const userModel = model<IUser>("User", userSchema);

export const omitSensitiveFields = (user: IUser) => {
  return omit(user.toObject(), ["password", "updatedAt"]);
};

export default userModel;
