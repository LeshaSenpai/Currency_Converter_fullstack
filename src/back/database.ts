import { Sequelize } from 'sequelize-typescript';
import Account from './models/Account';
import Currency from './models/Currency';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,          
    username: process.env.DB_USERNAME,  
    password: process.env.DB_PASSWORD,  
    database: process.env.DB_NAME,      
    models: [Account, Currency],        
    logging: true,                     
});
