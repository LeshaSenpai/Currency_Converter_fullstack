import { Sequelize } from 'sequelize';

export const sequelizeCurrencies = new Sequelize('currencyapi', 'postgres', '5990603bk', {
    host: 'localhost',
    dialect: 'postgres',
});

export const sequelizeAccounts = new Sequelize('accounts', 'postgres', '5990603bk', {
    host: 'localhost',
    dialect: 'postgres',
});