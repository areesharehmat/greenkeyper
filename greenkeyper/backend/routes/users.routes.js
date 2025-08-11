const express = require('express');
const router = express.Router();
const userService = require('../services/users.service');

router.post('/', async (req, res) => {
  try {
    const userId = await userService.registerUser(req.body);
    res.status(201).json({ id: userId });
  } catch (error) {
    console.error('❌ Error in /api/users POST:', error); // ADD THIS
    res.status(500).json({ error: error.message });         // AND THIS
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
