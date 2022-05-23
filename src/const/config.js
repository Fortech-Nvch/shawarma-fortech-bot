const dotenv = require("dotenv");

dotenv.config("../../.env");

const config = {
  botApiKey: process.env.BOT_TOKEN,
  googlePlacesApiKey: process.env.GOOGLE_PLACES_API,
  dbName: process.env.DB_NAME || "bot_db",
  dbUserName: process.env.DB_USER_NAME || "postgres",
  dbPassword: process.env.DB_PASSWORD || "postgres",
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: process.env.DB_PORT || 5432,
};

module.exports = {
  ...config,
};
