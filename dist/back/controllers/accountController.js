"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUsername = exports.loginAccount = exports.registerAccount = void 0;
const accountService_1 = require("../services/accountService");
const responseHelper_1 = require("../utils/responseHelper");
const constant_1 = require("../constant");
const registerAccount = async (req, res) => {
    const { username, login, password } = req.body;
    if (!username || !login || !password) {
        return (0, responseHelper_1.failureResponse)(res, constant_1.error_invalid_registration_data, 400);
    }
    try {
        const result = await (0, accountService_1.registerUser)(username, login, password);
        (0, responseHelper_1.successResponse)(res, constant_1.success_user_registered, result.data, result.status);
    }
    catch (err) {
        (0, responseHelper_1.failureResponse)(res, constant_1.error_registration, 500, err);
    }
};
exports.registerAccount = registerAccount;
const loginAccount = async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
        return (0, responseHelper_1.failureResponse)(res, constant_1.error_invalid_login_data, 400);
    }
    try {
        const result = await (0, accountService_1.loginUser)(login, password);
        (0, responseHelper_1.successResponse)(res, constant_1.success_login, result.data, result.status);
    }
    catch (err) {
        (0, responseHelper_1.failureResponse)(res, constant_1.error_login, 500, err);
    }
};
exports.loginAccount = loginAccount;
const fetchUsername = async (req, res) => {
    const login = req.query.login;
    if (!login) {
        return (0, responseHelper_1.failureResponse)(res, constant_1.error_login_not_provided, 400);
    }
    try {
        const result = await (0, accountService_1.getUsername)(login);
        (0, responseHelper_1.successResponse)(res, constant_1.success_username_found, result.data, result.status);
    }
    catch (err) {
        (0, responseHelper_1.failureResponse)(res, constant_1.error_fetch_username, 500, err);
    }
};
exports.fetchUsername = fetchUsername;
