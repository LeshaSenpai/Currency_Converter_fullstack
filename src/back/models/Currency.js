"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelizeCurrencies } = require('../../../database');
class Currency extends sequelize_1.Model {
}
Currency.init({
    text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    symbol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    currencycode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    rates: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize: sequelizeCurrencies,
    tableName: 'currencies',
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    freezeTableName: true
});
exports.default = Currency;
