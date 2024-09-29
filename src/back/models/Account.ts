import { DataTypes, Model, Optional } from 'sequelize';
const { sequelizeAccounts } = require('../../../database');

interface AccountAttributes {
    username: string;
    login: string; 
    password: string;
}

interface AccountCreationAttributes extends Optional<AccountAttributes, 'login'> {}

class Account extends Model<AccountAttributes, AccountCreationAttributes> implements AccountAttributes {
    public username!: string;
    public login!: string;
    public password!: string;
}

Account.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 20],
        },
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        validate: {
            len: [1, 20],
        },
    },
    password: {
        type: DataTypes.STRING,
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

export default Account;
