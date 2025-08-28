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

// Web routes
const webVehicleRoutes = require('./routes/web/vehicles.routes');
const webChecklistRoutes = require('./routes/web/checklists.routes');

// Mobile routes
const mobileVehicleRoutes = require('./routes/mobile/vehicles.routes');
const mobileChecklistRoutes = require('./routes/mobile/checklists.routes');

// Use routes
app.use('/api/users', userRoutes);

app.use('/api/web/vehicles', webVehicleRoutes);
app.use('/api/web/checklists', webChecklistRoutes);

app.use('/api/mobile/vehicles', mobileVehicleRoutes);
app.use('/api/mobile/checklists', mobileChecklistRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
