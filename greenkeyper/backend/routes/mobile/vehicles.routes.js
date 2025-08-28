const express = require('express');
const router = express.Router();
const vehicleService = require('../../services/vehicles.service');

// Create vehicle
router.post('/', async (req, res) => {
  try {
    const vehicle = await vehicleService.createVehicle(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get ALL vehicles (simplified for mobile)
router.get('/', async (req, res) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();

    // Simplified: only return id + license_plate
    const simplified = vehicles.map(v => ({
      id: v.id,
      plate: v.license_plate
    }));

    res.json({ source: "mobile", vehicles: simplified });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get vehicle by ID (simplified for mobile)
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await vehicleService.getVehicle(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    // Mobile gets reduced details
    const simplified = {
      id: vehicle.id,
      plate: vehicle.license_plate,
      make: vehicle.make
    };

    res.json(simplified);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Update vehicle
router.put('/:id', async (req, res) => {
  try {
    const updated = await vehicleService.updateVehicle(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete vehicle
router.delete('/:id', async (req, res) => {
  try {
    const result = await vehicleService.deleteVehicle(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
