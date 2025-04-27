// connect to the database i.e PG
// Sequelize DB configuration
// import { Sequelize } from 'sequelize';
const { Sequelize } = require('sequelize');
require('dotenv').config();



const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // set true if you want SQL logs in console
});

module.exports = sequelize;
