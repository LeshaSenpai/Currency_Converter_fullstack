import { Table, Column, Model } from 'sequelize-typescript';

@Table({
    tableName: 'accounts',
    timestamps: false, 
    freezeTableName: true, 
})
class Account extends Model {
    @Column({
        type: 'VARCHAR(20)',
        allowNull: false,
        validate: {
            len: [1, 20],  
        },
    })
    username!: string;

    @Column({
        type: 'VARCHAR(20)',
        allowNull: false,
        unique: true,  
        primaryKey: true,  
        validate: {
            len: [1, 20], 
        },
    })
    login!: string;

    @Column({
        type: 'VARCHAR(38)',
        allowNull: false,
        validate: {
            len: [1, 38],  
        },
    })
    password!: string;
}

export default Account;
