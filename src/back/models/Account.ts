import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'accounts',
  timestamps: true,
  freezeTableName: true,
})
class Account extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    validate: {
      len: [1, 20], 
    },
  })
  username!: string;

  @Unique
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    validate: {
      len: [1, 20], 
    },
  })
  login!: string;

  @Column({
    type: DataType.STRING(38),
    allowNull: false,
    validate: {
      len: [1, 38],  
    },
  })
  password!: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdat!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedat!: Date;
}

export default Account;
