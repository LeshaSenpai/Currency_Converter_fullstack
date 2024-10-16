"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrencies = void 0;
const currencyService_1 = require("../services/currencyService");
const responseHelper_1 = require("../utils/responseHelper");
const getCurrencies = async (req, res) => {
    try {
        const currencies = await (0, currencyService_1.fetchAllCurrencies)();
        (0, responseHelper_1.successResponse)(res, 'Данные о валютах успешно получены', currencies);
    }
    catch (err) {
        (0, responseHelper_1.failureResponse)(res, 'Ошибка при получении данных с базы', 500, err);
    }
};
exports.getCurrencies = getCurrencies;
