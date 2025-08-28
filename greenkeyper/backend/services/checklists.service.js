const checklistData = require('../data/checklists.data');

// Create checklist
exports.createChecklist = async (checklist) => {
  const id = await checklistData.createChecklist(checklist);
  return { id, ...checklist };
};

// Get checklist
exports.getAllChecklists = async () => {
  return await checklistData.getAllChecklists();
};

// Get all checklists for a vehicle
exports.getChecklistsByVehicle = async (vehicleId) => {
  return await checklistData.getChecklistsByVehicle(vehicleId);
};


// Update checklist
exports.updateChecklist = async (id, checklist) => {
  return await checklistData.updateChecklist(id, checklist);
};

// Delete checklist
exports.deleteChecklist = async (id) => {
  return await checklistData.deleteChecklist(id);
};
