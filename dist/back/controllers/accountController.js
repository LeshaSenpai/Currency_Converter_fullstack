"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUsername = exports.loginAccount = exports.registerAccount = void 0;
const accountService_1 = require("../services/accountService");
const registerAccount = async (req, res) => {
    const { username, login, password } = req.body;
    if (!username || !login || !password) {
        return res.status(401).json({ error: 'Неправильные данные для регистрации' });
    }
    try {
        const result = await (0, accountService_1.registerUser)(username, login, password);
        res.status(result.status).json(result.data);
    }
    catch (err) {
        res.status(500).json({ error: 'Ошибка при регистрации' });
    }
};
exports.registerAccount = registerAccount;
const loginAccount = async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
        return res.status(401).json({ error: 'Неправильные данные для авторизации' });
    }
    try {
        const result = await (0, accountService_1.loginUser)(login, password);
        res.status(result.status).json(result.data);
    }
    catch (err) {
        res.status(500).json({ error: 'Ошибка при авторизации' });
    }
};
exports.loginAccount = loginAccount;
const fetchUsername = async (req, res) => {
    const login = req.query.login;
    try {
        const result = await (0, accountService_1.getUsername)(login);
        res.status(result.status).json(result.data);
    }
    catch (err) {
        res.status(502).json({ error: 'Ошибка при получении данных' });
    }
};
exports.fetchUsername = fetchUsername;
