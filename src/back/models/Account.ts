import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, CreatedAt, UpdatedAt, AllowNull } from 'sequelize-typescript';

@Table({
  tableName: 'accounts',
  timestamps: true,
  freezeTableName: true,
})
class Account extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  username!: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(20))
  login!: string;

  @AllowNull(false)
  @Column(DataType.STRING(38))
  password!: string;

  @CreatedAt
  @AllowNull(false)
  @Column(DataType.DATE)
  createdat!: Date;

  @UpdatedAt
  @AllowNull(false)
  @Column(DataType.DATE)
  updatedat!: Date;
}

export default Account;
