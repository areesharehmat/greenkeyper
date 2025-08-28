const express = require('express');
const router = express.Router();
const checklistService = require('../../services/checklists.service');

// Create checklist
router.post('/', async (req, res) => {
  try {
    const checklist = await checklistService.createChecklist(req.body);
    res.status(201).json(checklist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get ALL checklists (simplified for mobile)
router.get('/', async (req, res) => {
  try {
    const checklists = await checklistService.getAllChecklists();

    // Only send essentials for mobile (id, name, type)
    const simplified = checklists.map(c => ({
      id: c.id,
      name: c.name,
      type: c.type
    }));

    res.json({ source: "mobile", checklists: simplified });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get checklist by ID (simplified)
router.get('/:id', async (req, res) => {
  try {
    const checklist = await checklistService.getChecklist(req.params.id);

    if (!checklist) {
      return res.status(404).json({ error: "Checklist not found" });
    }

    // Simplify response
    const simplified = {
      id: checklist.id,
      name: checklist.name,
      type: checklist.type,
      vehicle_id: checklist.vehicle_id
    };

    res.json(simplified);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Update checklist
router.put('/:id', async (req, res) => {
  try {
    const updated = await checklistService.updateChecklist(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete checklist
router.delete('/:id', async (req, res) => {
  try {
    const result = await checklistService.deleteChecklist(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
