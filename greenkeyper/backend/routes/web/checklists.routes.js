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

// Get ALL checklists (full details for web)
router.get('/', async (req, res) => {
  try {
    const checklists = await checklistService.getAllChecklists();
    res.json({ source: "web", checklists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get checklist by ID
router.get('/:id', async (req, res) => {
  try {
    const checklist = await checklistService.getChecklist(req.params.id);
    res.json(checklist);
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
