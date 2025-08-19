const db = require('../db');

// Insert new user
exports.createUser = async (user) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Insert into users
    const [result] = await conn.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [user.name, user.email, user.password]
    );

    const userId = result.insertId;

    // Insert into user_roles
    await conn.query(
      "INSERT INTO user_roles (user_id, role) VALUES (?, ?)",
      [userId, user.role]
    );

    await conn.commit();
    return userId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};


// Get all users
exports.getAllUsers = async () => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
};

// Get users by role
exports.getUsersByRole = async (role) => {
  const [rows] = await db.query(
    `SELECT u.* FROM users u 
     JOIN user_roles ur ON u.id = ur.user_id 
     WHERE ur.role = ?`,
    [role]
  );
  return rows;
};

// Get user by email
exports.getUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};
