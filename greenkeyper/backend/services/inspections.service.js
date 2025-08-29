const inspectionData = require('../data/inspections.data');

// Create inspection
exports.createInspection = async (inspection) => {
  return await inspectionData.createInspection(inspection);
};

// Get all inspections
exports.getAllInspections = async () => {
  return await inspectionData.getAllInspections();
};

// Get inspection by ID
exports.getInspectionById = async (id) => {
  return await inspectionData.getInspectionById(id);
};

// Update inspection
exports.updateInspection = async (id, inspection) => {
  return await inspectionData.updateInspection(id, inspection);
};

// Delete inspection
exports.deleteInspection = async (id) => {
  return await inspectionData.deleteInspection(id);
};
