const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userData = require('../data/users.data');

const SECRET = "supersecretkey"; // move to .env in production

// Register
exports.registerUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const userId = await userData.createUser({ ...user, password: hashedPassword });
  return userId;
};

// Login
exports.loginUser = async (email, password) => {
  const user = await userData.getUserByEmail(email);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
  return { token, user };
};

// Logout (client removes token, optional server blacklist logic)
exports.logoutUser = async () => {
  return { message: "Logout successful (remove token on client)" };
};

// Get all users
exports.getUsers = async () => {
  return await userData.getAllUsers();
};

// Get drivers
exports.getDrivers = async () => {
  return await userData.getUsersByRole('driver');
};

// Get mechanics
exports.getMechanics = async () => {
  return await userData.getUsersByRole('mechanic');
};

exports.updateUser = async (id, user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  return await userData.updateUser(id, user);
};

exports.deleteUser = async (id) => {
  return await userData.deleteUser(id);
};
