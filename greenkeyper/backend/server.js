const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
const userRoutes = require('./routes/users.routes');
const vehicleRoutes = require('./routes/vehicles.routes');   // ✅ Add this

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);   // ✅ Add this

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
