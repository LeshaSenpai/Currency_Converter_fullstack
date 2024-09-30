"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("../../../database");
const Currency_1 = __importDefault(require("../models/Currency"));
const Account_1 = __importDefault(require("../models/Account"));
const app = (0, express_1.default)();
app.use(cors());
app.use(body_parser_1.default.json());
database_1.sequelizeCurrencies.authenticate().then(() => database_1.sequelizeCurrencies.sync());
database_1.sequelizeAccounts.authenticate().then(() => database_1.sequelizeAccounts.sync());
app.get('/currencies', async (req, res) => {
    try {
        const currencies = await Currency_1.default.findAll();
        res.json(currencies);
    }
    catch (err) {
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
});
app.post('/accounts', async (req, res) => {
    const { username, login, password } = req.body;
    if (!username || !login || !password) {
        return res.status(400).json({ error: 'Неправильные данные' });
    }
    try {
        const existingAccount = await Account_1.default.findOne({ where: { login } });
        if (existingAccount) {
            return res.status(400).json({ error: 'Логин уже используется' });
        }
        const newUser = await Account_1.default.create({ username, login, password });
        res.status(201).json({ message: 'Пользователь зарегистрирован', user: newUser });
    }
    catch (err) {
        res.status(500).json({ error: 'Ошибка регистрации' });
    }
});
app.post('/accounts/login', async (req, res) => {
    const { login, password } = req.body;
    try {
        const account = await Account_1.default.findOne({ where: { login, password } });
        if (!account) {
            return res.status(401).json({ error: 'Неправильный логин или пароль' });
        }
        res.status(200).json({ message: 'Авторизация успешна' });
    }
    catch (err) {
        res.status(500).json({ error: 'Ошибка авторизации' });
    }
});
app.listen(5000, () => {
    console.log("Сервер запущен на порту 5000");
});
