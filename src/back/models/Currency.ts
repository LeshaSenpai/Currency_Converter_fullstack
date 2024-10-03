import { Table, Column, Model } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

@Table({
    tableName: 'currencies', 
    timestamps: false, 
    freezeTableName: true, 
})
class Currency extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    text!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    symbol!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true,
    })
    code!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    currencycode!: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    rates!: number;
}

export default Currency;
