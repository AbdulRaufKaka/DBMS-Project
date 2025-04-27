const express = require('express');
const { getAllFlights, createFlight } = require('../controllers/flightController');

const router = express.Router();

router.get('/', getAllFlights);
router.post('/', createFlight);

module.exports = router;
