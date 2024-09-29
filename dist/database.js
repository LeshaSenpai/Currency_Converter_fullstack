"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeAccounts = exports.sequelizeCurrencies = void 0;
const sequelize_1 = require("sequelize");
exports.sequelizeCurrencies = new sequelize_1.Sequelize('currencyapi', 'postgres', '5990603bk', {
    host: 'localhost',
    dialect: 'postgres',
});
exports.sequelizeAccounts = new sequelize_1.Sequelize('accounts', 'postgres', '5990603bk', {
    host: 'localhost',
    dialect: 'postgres',
});
