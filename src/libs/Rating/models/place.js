const { DataTypes } = require("sequelize");
const sequelize = require("../../../database/connection");

const Place = sequelize.define("places", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  placeId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  googleRating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ourRating: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

module.exports = Place;
