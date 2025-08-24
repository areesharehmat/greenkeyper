const db = require('../db');

// Create vehicle
exports.createVehicle = async (vehicle) => {
  const [result] = await db.query(
    "INSERT INTO vehicles (make, model, year, license_plate, vin) VALUES (?, ?, ?, ?, ?)",
    [vehicle.make, vehicle.model, vehicle.year, vehicle.license_plate, vehicle.vin]
  );

  return result.insertId;
};

// Get vehicle
exports.getVehicle = async (id) => {
  const [rows] = await db.query("SELECT * FROM vehicles WHERE id = ?", [id]);
  return rows[0];
};

// Update vehicle + checklist + assignment
exports.updateVehicle = async (id, vehicle) => {
  // Always update vehicle fields
  await db.query(
    "UPDATE vehicles SET make = ?, model = ?, year = ?, license_plate = ?, vin = ? WHERE id = ?",
    [vehicle.make, vehicle.model, vehicle.year, vehicle.license_plate, vehicle.vin, id]
  );

  // Update checklist assignment if provided
  if (vehicle.checklist_id) {
    await db.query(
      "UPDATE checklists SET vehicle_id = ? WHERE id = ?",
      [id, vehicle.checklist_id]
    );
  }

  // Update user assignment if provided
  if (vehicle.user_id) {
    await db.query(
      `INSERT INTO vehicle_assignments (vehicle_id, user_id) 
       VALUES (?, ?) 
       ON DUPLICATE KEY UPDATE user_id = VALUES(user_id)`,
      [id, vehicle.user_id]
    );
  }

  return { id, ...vehicle };
};

// Delete vehicle
exports.deleteVehicle = async (id) => {
  await db.query("DELETE FROM vehicle_assignments WHERE vehicle_id = ?", [id]);
  await db.query("DELETE FROM checklists WHERE vehicle_id = ?", [id]);
  await db.query("DELETE FROM vehicles WHERE id = ?", [id]);
  return { message: `Vehicle ${id} deleted` };
};
