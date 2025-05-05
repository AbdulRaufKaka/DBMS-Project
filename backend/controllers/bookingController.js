const { Booking, Flight } = require('../models');

// POST /api/flights/:flightId/book
exports.bookFlight = async (req, res) => {
  try {
    const flightId = req.params.flightId;
    const userId = req.user.id; // assuming you use JWT middleware to attach user to req
    const { seatsBooked = 1 } = req.body; // default to 1 seat if not specified

    // Fetch flight
    const flight = await Flight.findByPk(flightId);

    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    if (flight.availableSeats < seatsBooked) {
      return res.status(400).json({ error: 'Not enough available seats' });
    }

    // Create booking
    const booking = await Booking.create({
      UserId: userId,
      FlightId: flightId,
      seatsBooked,
      status: 'confirmed', // optional: add status tracking
    });

    // Update available seats
    flight.availableSeats -= seatsBooked;
    await flight.save();

    res.status(201).json({
      message: 'Flight booked successfully',
      booking,
      flight,
    });
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
