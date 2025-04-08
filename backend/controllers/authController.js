import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Helper function to create JWT token
const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//1. Register User
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(404).json({
        success: false,
        message: "Please provide all the details.",
      });
    }
    const user = await User.create({ name, email, password });

    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// 2. Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    //select("+password"): add password field to the response too because by default it is chosen to never "select" in the response.
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    //correctPassword(enteredPassword, userDbpassword)
    const isMatch = await user.correctPassword(password, user.password);
    if (!isMatch) {
      return res.status(402).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// 3. Protect routes - check if user is logged in
export const protect = async (req, res, next) => {
  try {
    // Get token from header
    // headers.authorization: Bearer ${token} so split(" ") then it returns array of
    // ['Bearer','${token}']
    // hence, [1] returns ${token}
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    // decoded.userId because in createToken(userId) we have userId as argument and jwt.sign({ userId }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};
