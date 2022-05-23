const { Sequelize } = require("sequelize");
const { dbName, dbUserName, dbPassword, dbPort } = require("../const/config");

const connection = new Sequelize(dbName, dbUserName, dbPassword, {
  dialect: "postgres",
  dialectOptions: {},
  host: process.env.DB_HOST,
  port: dbPort,
});
(async () => {
  try {
    await connection.sync();
    console.log("Connections established");
  } catch (err) {
    console.error("Db connection error");
    process.exit(1);
  }
})();

module.exports = connection;
