const mongoose = require("mongoose");
const dotenv = require("dotenv");

const user_connection = () => {
  try {
    //mongoose create connection
    const userConnection = mongoose.createConnection(process.env.MONGO_URI);
    userConnection.once("open", () => {
      console.log("connection open");
    });
    return userConnection;
  } catch (error) {
    console.log(error);
  }
};

module.exports = user_connection;
