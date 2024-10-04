import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
    tableName: 'currencies', 
    timestamps: true,
    freezeTableName: true, 
})
class Currency extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    text!: string;

    @Column({
        type: DataType.STRING(10),
        allowNull: false,
    })
    symbol!: string;

    @Column({
        type: DataType.STRING(10),
        allowNull: false,
        unique: true,
    })
    code!: string;

    @Column({
        type: DataType.STRING(10),
        allowNull: false,
    })
    currencycode!: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    rates!: number;

    @CreatedAt
    @Column({
        type: DataType.DATE,
    })
    createdat!: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
    })
    updatedat!: Date;
}

export default Currency;
