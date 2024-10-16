"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./database");
const Currency_1 = __importDefault(require("./models/Currency"));
const Account_1 = __importDefault(require("./models/Account"));
const responseHelper_1 = require("./utils/responseHelper");
const accountRoutes_1 = __importDefault(require("./routes/accountRoutes"));
const currencyRoutes_1 = __importDefault(require("./routes/currencyRoutes"));
(async () => {
    try {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(body_parser_1.default.json());
        app.use(accountRoutes_1.default);
        app.use(currencyRoutes_1.default);
        await database_1.sequelize.authenticate();
        await database_1.sequelize.sync();
        console.log("База данных синхронизирована");
        app.get('/currencies', async (req, res) => {
            try {
                const currencies = await Currency_1.default.findAll();
                (0, responseHelper_1.successResponse)(res, 'Данные о валютах успешно получены', currencies);
            }
            catch (err) {
                console.error('Ошибка при получении данных о валютах:', err);
                (0, responseHelper_1.failureResponse)(res, 'Ошибка при получении данных о валютах', 500, err);
            }
        });
        app.post('/accounts', async (req, res) => {
            const { username, login, password } = req.body;
            if (!username || !login || !password) {
                return (0, responseHelper_1.failureResponse)(res, 'Неправильные данные для регистрации', 400);
            }
            try {
                const existingAccount = await Account_1.default.findOne({ where: { login } });
                if (existingAccount) {
                    return (0, responseHelper_1.failureResponse)(res, 'Логин уже используется', 400);
                }
                const newUser = await Account_1.default.create({ username, login, password });
                (0, responseHelper_1.successResponse)(res, 'Пользователь успешно зарегистрирован', newUser, 201);
            }
            catch (err) {
                console.error('Ошибка регистрации:', err);
                (0, responseHelper_1.failureResponse)(res, 'Ошибка регистрации', 500, err);
            }
        });
        app.post('/accounts/login', async (req, res) => {
            const { login, password } = req.body;
            try {
                const account = await Account_1.default.findOne({ where: { login, password } });
                if (!account) {
                    return (0, responseHelper_1.failureResponse)(res, 'Неправильный логин или пароль', 401);
                }
                (0, responseHelper_1.successResponse)(res, 'Авторизация успешна', account, 200);
            }
            catch (err) {
                console.error('Ошибка авторизации:', err);
                (0, responseHelper_1.failureResponse)(res, 'Ошибка авторизации', 500, err);
            }
        });
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Сервер запущен на порту ${port}`);
        });
    }
    catch (error) {
        console.error("Ошибка при подключении к базе данных:", error);
    }
})();
