import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './database';
import Currency from './models/Currency';
import Account from './models/Account';
import { successResponse, failureResponse } from './utils/responseHelper';
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

    app.get('/currencies', async (req: Request, res: Response) => {
      try {
        const currencies = await Currency.findAll();
        successResponse(res, 'Данные о валютах успешно получены', currencies);
      } catch (err) {
        failureResponse(res, 'Ошибка при получении данных о валютах', 500, err);
      }
    });

    app.post('/accounts', async (req: Request, res: Response) => {
      const { username, login, password } = req.body;
      if (!username || !login || !password) {
        return failureResponse(res, 'Неправильные данные для регистрации', 400);
      }

      try {
        const existingAccount = await Account.findOne({ where: { login } });
        if (existingAccount) {
          return failureResponse(res, 'Логин уже используется', 400);
        }

        const newUser = await Account.create({ username, login, password });
        successResponse(res, 'Пользователь успешно зарегистрирован', newUser, 201);
      } catch (err) {
        console.error('Ошибка регистрации:', err);
        failureResponse(res, 'Ошибка регистрации', 500, err);
      }
    });

    app.post('/accounts/login', async (req: Request, res: Response) => {
      const { login, password } = req.body;
      try {
        const account = await Account.findOne({ where: { login, password } });
        if (!account) {
          return failureResponse(res, 'Неправильный логин или пароль', 401);
        }
        successResponse(res, 'Авторизация успешна', account, 200);
      } catch (err) {
        console.error('Ошибка авторизации:', err);
        failureResponse(res, 'Ошибка авторизации', 500, err);
      }
    });

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Сервер запущен на порту ${port}`);
    });
  } catch (error) {
    console.error("Ошибка при подключении к базе данных:", error);
  }
})();
