const express = require("express");
const router = express.Router();

const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP,please try again after 15 minutes",
});

const { register, login, updateUser } = require("../controllers/auth");
const authenticateUser = require("../middleware/authentication");

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/updateUser").patch(authenticateUser, updateUser);

module.exports = router;
