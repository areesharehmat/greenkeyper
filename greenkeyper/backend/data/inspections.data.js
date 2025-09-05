const db = require('../db');

// Create inspection
exports.createInspection = async (inspection) => {
  const [result] = await db.query(
    `INSERT INTO inspections (vehicle_id, user_id, checklist_id, status, notes) 
     VALUES (?, ?, ?, ?, ?)`,
    [inspection.vehicle_id, inspection.user_id, inspection.checklist_id, inspection.status || 'pending', inspection.notes || null]
  );
  return { id: result.insertId, ...inspection };
};

// Get all inspections
exports.getAllInspections = async () => {
  const [rows] = await db.query(`
    SELECT i.*, u.name as user_name, v.make as vehicle_make, v.model as vehicle_model, c.name as checklist_name
    FROM inspections i
    JOIN users u ON i.user_id = u.id
    JOIN vehicles v ON i.vehicle_id = v.id
    JOIN checklists c ON i.checklist_id = c.id
    ORDER BY i.created_at DESC
  `);
  return rows;
};

// Get inspection by ID
exports.getInspectionById = async (id) => {
  const [rows] = await db.query(
    `SELECT i.*, u.name as user_name, v.make as vehicle_make, v.model as vehicle_model, c.name as checklist_name
     FROM inspections i
     JOIN users u ON i.user_id = u.id
     JOIN vehicles v ON i.vehicle_id = v.id
     JOIN checklists c ON i.checklist_id = c.id
     WHERE i.id = ?`, [id]
  );
  return rows[0];
};

// Update inspection
exports.updateInspection = async (id, inspection) => {
  await db.query(
    `UPDATE inspections 
     SET vehicle_id=?, user_id=?, checklist_id=?, status=?, notes=? 
     WHERE id=?`,
    [inspection.vehicle_id, inspection.user_id, inspection.checklist_id, inspection.status, inspection.notes, id]
  );
  return { id, ...inspection };
};

// Delete inspection
exports.deleteInspection = async (id) => {
  await db.query("DELETE FROM inspections WHERE id=?", [id]);
  return { message: `Inspection ${id} deleted` };
};

