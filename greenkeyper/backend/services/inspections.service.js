const inspectionData = require('../data/inspections.data');
const db = require('../db');

// Ensure checklist exists before creating inspection
exports.createInspection = async (inspection) => {
  const [rows] = await db.query("SELECT id FROM checklists WHERE id=?", [inspection.checklist_id]);
  if (rows.length === 0) {
    throw new Error("Checklist does not exist. Cannot create inspection.");
  }
  return await inspectionData.createInspection(inspection);
};

exports.getAllInspections = async () => {
  return await inspectionData.getAllInspections();
};

exports.getInspectionById = async (id) => {
  return await inspectionData.getInspectionById(id);
};

exports.updateInspection = async (id, inspection) => {
  return await inspectionData.updateInspection(id, inspection);
};

exports.deleteInspection = async (id) => {
  return await inspectionData.deleteInspection(id);
};
