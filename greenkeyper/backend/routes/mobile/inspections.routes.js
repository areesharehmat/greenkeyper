const express = require('express');
const router = express.Router();
const inspectionService = require('../../services/inspections.service');

// Create inspection
router.post('/', async (req, res) => {
  try {
    const inspection = await inspectionService.createInspection(req.body);
    res.status(201).json(inspection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get ALL inspections (simplified)
router.get('/', async (req, res) => {
  try {
    const inspections = await inspectionService.getAllInspections();

    const simplified = inspections.map(i => ({
      id: i.id,
      status: i.status,
      vehicle_id: i.vehicle_id,
      checklist_id: i.checklist_id
    }));

    res.json({ source: "mobile", inspections: simplified });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get inspection by ID (simplified)
router.get('/:id', async (req, res) => {
  try {
    const inspection = await inspectionService.getInspectionById(req.params.id);

    if (!inspection) return res.status(404).json({ error: "Not found" });

    const simplified = {
      id: inspection.id,
      status: inspection.status,
      vehicle_id: inspection.vehicle_id,
      checklist_id: inspection.checklist_id
    };

    res.json(simplified);
  } catch (err) {
    res.status(404).json({ error: err.message });
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
