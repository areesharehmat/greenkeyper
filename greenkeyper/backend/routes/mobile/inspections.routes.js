const express = require('express');
const router = express.Router();
const inspectionService = require('../../services/inspections.service');

// Create inspection (driver submits checklist)
router.post('/', async (req, res) => {
  try {
    const inspection = await inspectionService.createInspection(req.body);
    res.status(201).json(inspection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get inspections for a specific user (driver’s history)
router.get('/user/:userId', async (req, res) => {
  try {
    const inspections = await inspectionService.getAllInspections();
    const userInspections = inspections.filter(i => i.user_id == req.params.userId);
    res.json(userInspections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific inspection (simplified view for mobile)
router.get('/:id', async (req, res) => {
  try {
    const inspection = await inspectionService.getInspectionById(req.params.id);
    if (!inspection) return res.status(404).json({ error: "Not found" });

    res.json({
      id: inspection.id,
      status: inspection.status,
      notes: inspection.notes,
      checklist_id: inspection.checklist_id,
      vehicle_id: inspection.vehicle_id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
