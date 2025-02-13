const jwt = require("jsonwebtoken");
const User = require("../models/user.models");
const { sendErrorResponse } = require("../middlewares/errorHandler");

const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async (req, res, next) => {
  const { username, email, password, fullName, gender, dateOfBirth, country } =
    req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email && existingUser.username === username) {
        return sendErrorResponse(
          res,
          400,
          "Both email and username already exist"
        );
      } else if (existingUser.email === email) {
        return sendErrorResponse(res, 400, "Email already exists");
      } else if (existingUser.username === username) {
        return sendErrorResponse(res, 400, "Username already exists");
      }
    }

    const user = new User({
      username,
      email,
      password,
      fullName,
      gender,
      dateOfBirth,
      country,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return sendErrorResponse(res, 400, "Invalid email/username or password");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return sendErrorResponse(res, 400, "Invalid email/username or password");
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};
const searchUser = async (req, res, next) => {
  const { searchQuery } = req.query;

  try {
    const user = await User.findOne({
      $or: [{ email: searchQuery }, { username: searchQuery }],
    });

    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }

    res.status(200).json({
      message: "User found",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        country: user.country,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser, loginUser, searchUser };
