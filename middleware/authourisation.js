const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/user-model");

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];

      //Verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      if (error.message === "jwt expired") {
        try {
          const decoded = jwt.verify(
            req.headers.refresh_token,
            process.env.REFRESH_JWT_SECRET
          );

          console.log(decoded);
          const jwttoken = jwt.sign(
            { id: req.headers.id },
            process.env.JWT_SECRET,
            {
              expiresIn: "29m",
            }
          );
          const refresh_jwttoken = jwt.sign(
            { id: req.headers.id },
            process.env.REFRESH_JWT_SECRET,
            {
              expiresIn: "30m",
            }
          );
          res.appendHeader("newToken", jwttoken);
          res.appendHeader("refreshToken", refresh_jwttoken);
          next();
        } catch (error) {
          res.status(401);
          throw new Error("Not Authourised");
        }
      }
    }
  } else {
    res.status(401);
    throw new Error("Not Authourised No Token");
  }
});

module.exports = { protectRoute };
