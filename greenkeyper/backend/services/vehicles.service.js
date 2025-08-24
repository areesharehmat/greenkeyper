const vehicleData = require('../data/vehicles.data');

// Create vehicle
exports.createVehicle = async (vehicle) => {
  try {
    const id = await vehicleData.createVehicle(vehicle);
    return { id, ...vehicle };
  } catch (err) {
    throw new Error("Error creating vehicle: " + err.message);
  }
};

// Get vehicle by ID
exports.getVehicle = async (id) => {
  try {
    const vehicle = await vehicleData.getVehicle(id);
    if (!vehicle) throw new Error("Vehicle not found");
    return vehicle;
  } catch (err) {
    throw new Error("Error fetching vehicle: " + err.message);
  }
};

// Update vehicle
exports.updateVehicle = async (id, vehicle) => {
  try {
    const updated = await vehicleData.updateVehicle(id, vehicle);
    return updated;
  } catch (err) {
    throw new Error("Error updating vehicle: " + err.message);
  }
};

// Delete vehicle
exports.deleteVehicle = async (id) => {
  try {
    return await vehicleData.deleteVehicle(id);
  } catch (err) {
    throw new Error("Error deleting vehicle: " + err.message);
  }
};
