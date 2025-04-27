// Sequelization ORM initialization
const sequelize = require('../config/db');
const Flight = require('./Flight');
const User = require('./User');
const Booking = require('./Booking');

// Define relationships
User.hasMany(Booking);
Booking.belongsTo(User);

Flight.hasMany(Booking);
Booking.belongsTo(Flight);

// Sync models
const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true }); // syncs models to DB
    console.log('Models synced successfully.');
  } catch (error) {
    console.error('Failed to sync models:', error);
  }
};

module.exports = {
  sequelize,
  Flight,
  User,
  Booking,
  syncModels,
};
