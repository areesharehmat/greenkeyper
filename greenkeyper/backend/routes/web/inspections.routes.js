const express = require('express');
const router = express.Router();
const inspectionService = require('../../services/inspections.service');

// Get all inspections
router.get('/', async (req, res) => {
  try {
    const inspections = await inspectionService.getAllInspections();
    res.json(inspections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get inspection by ID
router.get('/:id', async (req, res) => {
  try {
    const inspection = await inspectionService.getInspectionById(req.params.id);
    if (!inspection) return res.status(404).json({ error: "Inspection not found" });
    res.json(inspection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update inspection
router.put('/:id', async (req, res) => {
  try {
    const updated = await inspectionService.updateInspection(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete inspection
router.delete('/:id', async (req, res) => {
  try {
    const result = await inspectionService.deleteInspection(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
