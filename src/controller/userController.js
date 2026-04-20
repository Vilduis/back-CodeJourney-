const {
  createUser,
  authenticateUser,
  findUserByEmail,
  validateEmail,
  updateUser,
} = require("../services/userService");

const sanitizeUser = (user) => {
  const obj = user.toObject();
  delete obj.password;
  return obj;
};

const registerUserController = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ message: "User created successfully", user: sanitizeUser(user) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authenticateUser(email, password);
    res.status(200).json({ message: "Login successful", token, user: sanitizeUser(user) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserProfileController = async (req, res) => {
  try {
    const user = await findUserByEmail(req.user.email);
    res.status(200).json({ user: sanitizeUser(user) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validateEmailController = async (req, res) => {
  try {
    const { email } = req.body;
    const isEmailRegistered = await validateEmail(email);
    res.status(200).json({ isEmailRegistered });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId !== req.user.userId.toString()) {
      return res.status(403).json({ error: "You can only update your own profile" });
    }
    const updatedUser = await updateUser(userId, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(sanitizeUser(updatedUser));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  getUserProfileController,
  validateEmailController,
  updateUserController,
};
