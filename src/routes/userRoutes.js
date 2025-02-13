const express = require("express");
const {
  createUser,
  loginUser,
  searchUser,
} = require("../controllers/user.controllers");
const {
  registerSchema,
  loginSchema,
} = require("../validators/user.validation");
const validate = require("../middlewares/validate");
const validateUser = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", validate(registerSchema), createUser);

router.post("/login", validate(loginSchema), loginUser);

router.get("/search", validateUser, searchUser);

module.exports = router;
