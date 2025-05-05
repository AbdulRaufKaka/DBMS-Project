// routes/adminRoutes.js
const express = require('express');
const { adminLogin } = require('../controllers/admincontroller');
const router = express.Router();

router.post('/login', adminLogin);

module.exports = router;
