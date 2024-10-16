"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUsername = exports.loginAccount = exports.registerAccount = void 0;
const accountService_1 = require("../services/accountService");
const responseHelper_1 = require("../utils/responseHelper");
const registerAccount = async (req, res) => {
    const { username, login, password } = req.body;
    if (!username || !login || !password) {
        return (0, responseHelper_1.failureResponse)(res, 'Неправильные данные для регистрации', 400);
    }
    try {
        const result = await (0, accountService_1.registerUser)(username, login, password);
        (0, responseHelper_1.successResponse)(res, 'Пользователь успешно зарегистрирован', result.data, result.status);
    }
    catch (err) {
        (0, responseHelper_1.failureResponse)(res, 'Ошибка при регистрации', 500, err);
    }
};
exports.registerAccount = registerAccount;
const loginAccount = async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
        return (0, responseHelper_1.failureResponse)(res, 'Неправильные данные для авторизации', 400);
    }
    try {
        const result = await (0, accountService_1.loginUser)(login, password);
        (0, responseHelper_1.successResponse)(res, 'Авторизация успешна', result.data, result.status);
    }
    catch (err) {
        (0, responseHelper_1.failureResponse)(res, 'Ошибка при авторизации', 500, err);
    }
};
exports.loginAccount = loginAccount;
const fetchUsername = async (req, res) => {
    const login = req.query.login;
    if (!login) {
        return (0, responseHelper_1.failureResponse)(res, 'Логин не указан', 400);
    }
    try {
        const result = await (0, accountService_1.getUsername)(login);
        (0, responseHelper_1.successResponse)(res, 'Имя пользователя найдено', result.data, result.status);
    }
    catch (err) {
        (0, responseHelper_1.failureResponse)(res, 'Ошибка при получении данных', 500, err);
    }
};
exports.fetchUsername = fetchUsername;
