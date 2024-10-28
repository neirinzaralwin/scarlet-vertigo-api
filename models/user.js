const { model, Schema } = require("mongoose");

const userSchema = new Schema(
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
        validator: function (value) {
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
        validator: function (value) {
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

const userModel = model("User", userSchema);

module.exports = userModel;
