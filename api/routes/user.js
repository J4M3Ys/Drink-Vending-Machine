const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const User = require("../controllers/user");

const router = express.Router();

router.put("/login", User.Login);
router.post("/user", User.Create);

router.get("/user", authenticateToken, User.GetUser);
router.put("/read-notify", authenticateToken, User.ReadNotify);

module.exports = router;
