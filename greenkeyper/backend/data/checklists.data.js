const db = require('../db');

// Create checklist
exports.createChecklist = async (checklist) => {
  const [result] = await db.query(
    "INSERT INTO checklists (vehicle_id, name, type) VALUES (?, ?, ?)",
    [checklist.vehicle_id, checklist.name, checklist.type]
  );
  return result.insertId;
};

// Get checklist by ID
exports.getChecklist = async (id) => {
  const [rows] = await db.query("SELECT * FROM checklists WHERE id = ?", [id]);
  return rows[0];
};

// Get all checklists for a vehicle
exports.getAllChecklists = async () => {
  const [rows] = await db.query("SELECT * FROM checklists");
  return rows;
};

// Update checklist
exports.updateChecklist = async (id, checklist) => {
  await db.query(
    "UPDATE checklists SET name = ?, type = ? WHERE id = ?",
    [checklist.name, checklist.type, id]
  );
  return { id, ...checklist };
};

// Delete checklist
exports.deleteChecklist = async (id) => {
  await db.query("DELETE FROM checklists WHERE id = ?", [id]);
  return { message: `Checklist ${id} deleted` };
};
