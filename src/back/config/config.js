require('dotenv').config({ path: './src/back/.env' });

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: DB_HOSTNUMBER,
    dialect: process.env.DB_DIALECT
  }
};
