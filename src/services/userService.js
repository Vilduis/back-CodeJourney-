const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error creating user");
  }
};

const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error("Error finding user");
  }
};

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );

  return { token, user };
};

const validateEmail = async (email) => {
  const user = await User.findOne({ email });
  return !user;
};

const updateUser = async (userId, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user");
  }
};

module.exports = { createUser, findUserByEmail, authenticateUser, validateEmail, updateUser };
