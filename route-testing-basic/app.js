const express = require('express');
const app = express();
app.use(express.json()); // allows parsing JSON in POST/PUT/PATCH


// Import the birds router
const birds = require('./birds');

// Use the birds router for any requests to /birds
app.use('/birds', birds);

// Root route for the main app
app.get('/', (req, res) => {
  res.send('Welcome to the main app!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
