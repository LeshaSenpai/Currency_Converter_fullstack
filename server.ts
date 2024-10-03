import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './database';  
import accountRoutes from './src/back/routes/accountRoutes';
import currencyRoutes from './src/back/routes/currencyRoutes';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(accountRoutes);
app.use(currencyRoutes);

sequelize.authenticate().then(() => {
    return sequelize.sync();
}).then(() => {
    console.log("База данных синхронизирована");
    app.listen(5000, () => {
        console.log("Сервер запущен на порту 5000");
    });
}).catch((error) => {
    console.error("Ошибка при подключении к базе данных:", error);
});
