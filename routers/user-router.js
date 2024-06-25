const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const userController = require("../controller/user-controller");
router.get("/", (req, res) => {
  const Users = userController.getUsers();
  console.log(Users);
  res.json({ message: "User Data", users: Users });
});

router.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const Users = await userController.registerUser(req);
      res.status(200).json({
        message: "User Registered",
        users: {
          user: Users.users.userName,
          email: Users.users.email,
          createdat: Users.users.createdAt,
          id: Users.users._id,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  })
);

router.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    try {
      const Users = await userController.authenticateUser(req);
      res.status(200).json({
        message: "User Authenticated",
        users: Users,
      });
    } catch (error) {
      res.status(401).json({ error: "Bad User Credentials" });
    }
  })
);

module.exports = router;
