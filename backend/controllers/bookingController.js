const { Booking } = require('../models');

exports.bookFlight = async (req, res) => {
  try {
    const { userId, flightId, seatsBooked } = req.body;
    const booking = await Booking.create({ UserId: userId, FlightId: flightId, seatsBooked });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
