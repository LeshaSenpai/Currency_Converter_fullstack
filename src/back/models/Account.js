"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelizeAccounts } = require('../../../database');
class Account extends sequelize_1.Model {
}
Account.init({
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 20],
        },
    },
    login: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        validate: {
            len: [1, 20],
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 38],
        },
    },
}, {
    sequelize: sequelizeAccounts,
    tableName: 'accounts',
    timestamps: false,
    freezeTableName: true,
});
exports.default = Account;
