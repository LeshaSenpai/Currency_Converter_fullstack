"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsername = exports.loginUser = exports.registerUser = void 0;
const Account_1 = __importDefault(require("../models/Account"));
const registerUser = async (username, login, password) => {
    const existingAccount = await Account_1.default.findOne({ where: { login } });
    if (existingAccount) {
        return { status: 400, data: { error: 'Логин уже используется' } };
    }
    const newUser = await Account_1.default.create({ username, login, password });
    return { status: 201, data: { message: 'Пользователь зарегистрирован', user: newUser } };
};
exports.registerUser = registerUser;
const loginUser = async (login, password) => {
    const account = await Account_1.default.findOne({ where: { login, password } });
    if (!account) {
        return { status: 401, data: { error: 'Неправильный логин или пароль' } };
    }
    return { status: 200, data: { message: 'Авторизация успешна' } };
};
exports.loginUser = loginUser;
const getUsername = async (login) => {
    const account = await Account_1.default.findOne({ where: { login } });
    if (!account) {
        return { status: 404, data: { error: 'Пользователь не найден' } };
    }
    return { status: 200, data: { username: account.username } };
};
exports.getUsername = getUsername;
