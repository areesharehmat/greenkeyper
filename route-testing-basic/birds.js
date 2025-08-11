const express = require('express');
const router = express.Router();

// Fake bird "database"
let birds = [
  { id: 1, name: 'Sparrow' },
  { id: 2, name: 'Eagle' },
  { id: 3, name: 'Parrot' }
];

// Log each request time
router.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// GET all birds
router.get('/', (req, res) => {
  res.json(birds);
});

// GET one bird by ID
router.get('/:id', (req, res) => {
  const bird = birds.find(b => b.id == req.params.id);
  bird ? res.json(bird) : res.status(404).send('Bird not found');
});

// POST - add a new bird
router.post('/', (req, res) => {
  const newBird = {
    id: birds.length + 1,
    name: req.body.name
  };
  birds.push(newBird);
  res.status(201).json(newBird);
});

// PUT - replace bird
router.put('/:id', (req, res) => {
  const index = birds.findIndex(b => b.id == req.params.id);
  if (index !== -1) {
    birds[index] = { id: parseInt(req.params.id), name: req.body.name };
    res.json(birds[index]);
  } else {
    res.status(404).send('Bird not found');
  }
});

// PATCH - update bird name only
router.patch('/:id', (req, res) => {
  const bird = birds.find(b => b.id == req.params.id);
  if (bird) {
    bird.name = req.body.name || bird.name;
    res.json(bird);
  } else {
    res.status(404).send('Bird not found');
  }
});

// DELETE
router.delete('/:id', (req, res) => {
  const index = birds.findIndex(b => b.id == req.params.id);
  if (index !== -1) {
    const deleted = birds.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).send('Bird not found');
  }
});

module.exports = router;
