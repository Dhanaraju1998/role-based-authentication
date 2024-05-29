const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    middlename: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default: "https://oucabikes.com/wp-content/uploads/2022/05/NoImage2x.png",
    },
    dob: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserSchema = mongoose.model("User", user);

module.exports = UserSchema
