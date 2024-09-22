const { Sequelize } = require('sequelize');
    
const sequelizeCurrencies = new Sequelize('currencyapi', 'postgres', '5990603bk', {
    host: 'localhost',
    dialect: 'postgres',
});

const sequelizeAccounts = new Sequelize('accounts', 'postgres', '5990603bk', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = { sequelizeCurrencies, sequelizeAccounts };
