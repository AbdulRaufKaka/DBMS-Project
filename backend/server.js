// main entery point for the server
// The entry point that sets up and runs the Express server for the application.

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, syncModels } = require('./models');

// Import routes
const flightRoutes = require('./routes/flightRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/flights', flightRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);

// Simple route
app.get('/', (req, res) => {
  res.send('Airline Reservation System Backend Running (with Sequelize)');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate(); // connect to the database
    console.log('Database connected ✅');
    await syncModels(); // create tables if not exist
  } catch (error) {
    console.error('Unable to connect to DB ❌', error);
  }
});

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);
