import { DataTypes, Model, Optional } from 'sequelize';
const { sequelizeCurrencies} = require('../../../database');

interface CurrencyAttributes {
    text: string;
    symbol: string;
    code: string; 
    currencycode: string;
    rates: number;
}

interface CurrencyCreationAttributes extends Optional<CurrencyAttributes, 'code'> {}

class Currency extends Model<CurrencyAttributes, CurrencyCreationAttributes> implements CurrencyAttributes {
    public text!: string;
    public symbol!: string;
    public code!: string;
    public currencycode!: string;
    public rates!: number;
}

Currency.init({
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    currencycode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rates: {
        type: DataTypes.FLOAT,
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

export default Currency;
