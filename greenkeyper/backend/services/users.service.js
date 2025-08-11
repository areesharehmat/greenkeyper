const userData = require('../data/users.data');

exports.registerUser = async (user) => {
  // You can hash password here
  return await userData.createUser(user);
};

exports.getUser = async (id) => {
  return await userData.getUserById(id);
};
