const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Flight = sequelize.define('Flight', {
  flightNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  arrivalTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Flight;
// This model represents a flight with attributes like flight number, origin, destination, departure time, arrival time, and available seats. It uses Sequelize to define the model and its attributes. The model is then exported for use in other parts of the application.