const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Employee = require('./Employee');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount_paid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = Payment;