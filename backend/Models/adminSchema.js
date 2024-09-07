const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email is unique across admin users
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    profilepic: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.w-L3HP_7QYalYXw7apT2tAHaHx?rs=1&pid=ImgDetMain",
    },
    role: {
      type: String,
      enum: ["admin", "superadmin"], // Allows for different levels of admin roles
      default: "admin",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, // Manages if the admin account is active
    },
    lastLogin: {
      type: Date, // To track the last login date of the admin
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
