const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Booking = sequelize.define('Booking', {
  seatsBooked: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Booking;
