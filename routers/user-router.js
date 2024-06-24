const router = require("express").Router();
const userController = require("../controller/user-controller");

router.get("/", (req, res) => {
  res.send("Get Users");
});

module.exports = router;
