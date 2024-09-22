const { DataTypes } = require('sequelize');
const { sequelizeAccounts } = require('../database');

const Account = sequelizeAccounts.define('Account', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 20]
        }
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        validate: {
            len: [1, 20]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 38]
        }
    }
}, {
    tableName: 'accounts', 
    timestamps: false,
    freezeTableName: true 
});

module.exports = Account;
