import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './database';
import accountRoutes from './routes/accountRoutes';
import currencyRoutes from './routes/currencyRoutes';

(async () => {
  try {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(accountRoutes);
    app.use(currencyRoutes);

    await sequelize.authenticate();
    await sequelize.sync();

    console.log("База данных синхронизирована");

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Сервер запущен на порту ${port}`);
    });
  } catch (error) {
    console.error("Ошибка при подключении к базе данных:", error);
  }
})();
