// Updated flightController.js with full admin functionality
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

// Delete flight by ID
exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).json({ error: 'Flight not found' });
    await flight.destroy();
    res.json({ message: 'Flight deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Book flight for user
exports.bookFlight = async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).json({ error: 'Flight not found' });
    if (flight.availableSeats < 1) return res.status(400).json({ error: 'No available seats' });

    // Decrease seat count and update
    flight.availableSeats -= 1;
    await flight.save();

    // Optional: Save booking to a Booking model (not implemented yet)

    res.json({ message: 'Flight booked successfully', flight });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
