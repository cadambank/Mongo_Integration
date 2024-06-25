const mongoose = require("mongoose");
const connection = require("../config/user-config");

userConn = connection();

const userSchema = mongoose.Schema(
  {
    userName: {
      type: "string",
      required: [true, "Please add a username"],
    },
    password: {
      type: "string",
      required: [true, "Please add a password"],
    },
    email: {
      type: "string",
      required: [true, "Please add a email"],
    },
  },
  {
    timestamps: true,
  }
);

userModel = userConn.model("Goal", userSchema, "users");
module.exports = userModel;
