const express = require('express');
const { bookFlight } = require('../controllers/bookingController');

const router = express.Router();

router.post('/', bookFlight);

module.exports = router;
