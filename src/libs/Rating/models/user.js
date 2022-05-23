const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/connection');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  is_bot: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  language_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
