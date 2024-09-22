const { DataTypes } = require('sequelize');
const { sequelizeCurrencies} = require('../database');

const Currency = sequelizeCurrencies.define('Currency', {
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true 
    },
    currencycode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rates: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'currencies', 
    timestamps: false, 
    updatedAt: false,
    createdAt: false,
    freezeTableName: true 
});

module.exports = Currency;
