const express = require('express');
const { getAllFlights, createFlight, deleteFlight, bookFlight } = require('../controllers/flightController');

const router = express.Router();

// Existing routes
router.get('/', getAllFlights);
router.post('/', createFlight);

// Add the missing DELETE route
router.delete('/:id', deleteFlight);

// Also add the booking route if you need it
router.post('/:id/book', bookFlight);
module.exports = router;
