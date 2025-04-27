const { Flight } = require('../models');

// Fetch all flights
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.findAll();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add new flight
exports.createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
