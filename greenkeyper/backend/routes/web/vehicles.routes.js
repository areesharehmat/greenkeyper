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

// Get ALL vehicles (full details for web)
router.get('/', async (req, res) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.json({ source: "web", vehicles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get vehicle by ID
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await vehicleService.getVehicle(req.params.id);
    res.json(vehicle);
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
