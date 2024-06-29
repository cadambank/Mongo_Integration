const userModel = require("../model/user-model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");

const getUsers = asyncHandler(async () => {
  const users = await userModel.find();
  return users;
});

const registerUser = asyncHandler(async (req) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const email = req.body.email;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const fetchUsers = await userModel.find({ email: email });
  if (fetchUsers.length !== 0) {
    const error = new Error("User Already Exists");
    error.code = "User Already Exists";
    throw error;
  } else {
    const users = new userModel({
      userName: userName,
      password: hashedPassword,
      email: email,
    });
    await users.save();
    return { users };
  }
});

const authenticateUser = expressAsyncHandler(async (req) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const email = req.body.email;
  const user = await userModel.find({ email: email, userName: userName });

  if (user.length === 0) {
    throw new Error("User Not Found");
  }

  result = await bcrypt.compare(password, user[0].password);

  if (result) {
    const jwttoken = jwt.sign({ id: user[0]._id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
    return {
      id: user[0]._id,
      userName: user[0].userName,
      email: user[0].email,
      token: jwttoken,
    };
  } else {
    throw new Error("Bad Credentials");
  }
});

const getMe = expressAsyncHandler(async (req, res) => {
  res.status(200).send("Get Me");
});

module.exports = { getUsers, registerUser, authenticateUser, getMe };
