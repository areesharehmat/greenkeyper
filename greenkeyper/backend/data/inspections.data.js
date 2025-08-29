const db = require('../db');

// Create inspection
exports.createInspection = async (inspection) => {
  const [result] = await db.query(
    "INSERT INTO inspections (vehicle_id, user_id, checklist_id, status, notes) VALUES (?, ?, ?, ?, ?)",
    [inspection.vehicle_id, inspection.user_id, inspection.checklist_id, inspection.status || 'pending', inspection.notes || null]
  );
  return { id: result.insertId, ...inspection };
};

// Get all inspections
exports.getAllInspections = async () => {
  const [rows] = await db.query("SELECT * FROM inspections");
  return rows;
};

// Get inspection by ID
exports.getInspectionById = async (id) => {
  const [rows] = await db.query("SELECT * FROM inspections WHERE id = ?", [id]);
  return rows[0];
};

// Update inspection
exports.updateInspection = async (id, inspection) => {
  await db.query(
    "UPDATE inspections SET vehicle_id=?, user_id=?, checklist_id=?, status=?, notes=? WHERE id=?",
    [inspection.vehicle_id, inspection.user_id, inspection.checklist_id, inspection.status, inspection.notes, id]
  );
  return { id, ...inspection };
};

// Delete inspection
exports.deleteInspection = async (id) => {
  await db.query("DELETE FROM inspections WHERE id=?", [id]);
  return { message: `Inspection ${id} deleted` };
};
