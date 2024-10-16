"use strict";
require('dotenv').config();
module.exports = {
    development: {
        username: "postgres",
        password: process.env.DB_PASSWORD,
        database: "currencyapi",
        host: "127.0.0.1",
        dialect: "postgres"
    }
};
