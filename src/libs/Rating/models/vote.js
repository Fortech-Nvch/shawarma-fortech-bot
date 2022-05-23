const { DataTypes } = require("sequelize");
const sequelize = require("../../../database/connection");

const Vote = sequelize.define("votes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  placeId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vote: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Vote;
