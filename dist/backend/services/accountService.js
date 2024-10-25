"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsername = exports.loginUser = exports.registerUser = void 0;
const Account_1 = __importDefault(require("../models/Account"));
const constant_1 = require("../constant");
const registerUser = async (username, login, password) => {
    const existingAccount = await Account_1.default.findOne({ where: { login } });
    if (existingAccount) {
        return { status: 400, data: { error: constant_1.error_login_already_used } };
    }
    const newUser = await Account_1.default.create({ username, login, password });
    return { status: 201, data: { message: constant_1.success_user_registered, user: newUser } };
};
exports.registerUser = registerUser;
const loginUser = async (login, password) => {
    const account = await Account_1.default.findOne({ where: { login, password } });
    if (!account) {
        return { status: 401, data: { error: constant_1.error_incorrect_login_password } };
    }
    return { status: 200, data: { message: constant_1.success_login } };
};
exports.loginUser = loginUser;
const getUsername = async (login) => {
    const account = await Account_1.default.findOne({ where: { login } });
    if (!account) {
        return { status: 404, data: { error: constant_1.error_user_not_found } };
    }
    return { status: 200, data: { username: account.username } };
};
exports.getUsername = getUsername;
