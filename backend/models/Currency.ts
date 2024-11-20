import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, AllowNull, Unique } from 'sequelize-typescript';

@Table({
    tableName: 'currencies', 
    timestamps: true,
    freezeTableName: true, 
})
class Currency extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    id!: number;

    @AllowNull(false)
    @Column(DataType.STRING(100))
    text!: string;

    @AllowNull(false)
    @Column(DataType.STRING(10))
    symbol!: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(10))
    code!: string;

    @AllowNull(false)
    @Column(DataType.STRING(10))
    currencycode!: string;

    @AllowNull(false)
    @Column(DataType.DECIMAL(10, 2))
    rates!: number;

    @CreatedAt
    @AllowNull(false)
    @Column(DataType.DATE)
    createdat!: Date;

    @UpdatedAt
    @AllowNull(false)
    @Column(DataType.DATE)
    updatedat!: Date;
}

export default Currency;
