const dotenv = require("dotenv");
const express = require("express");
const logger = require("./middleware/logger");
PORT = process.env.API_PORT || 8000;

//Initialising Express App
app = express();

//Starting the API app
app.listen(PORT, () => {
  console.log(`${process.env.ENVIRONMENT} API Server Started at Port ${PORT}`);
});

//Initiating Logger Middleware
app.use(logger);

//Initiating routes
app.use("/api/user", require("./routers/user-router"));
