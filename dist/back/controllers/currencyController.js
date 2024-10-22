"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrencies = void 0;
const currencyService_1 = require("../services/currencyService");
const responseHelper_1 = require("../utils/responseHelper");
const constant_1 = require("../constant");
const getCurrencies = async (req, res) => {
    try {
        const currencies = await (0, currencyService_1.fetchAllCurrencies)();
        (0, responseHelper_1.successResponse)(res, constant_1.success_currency_fetch, currencies);
    }
    catch (err) {
        (0, responseHelper_1.failureResponse)(res, constant_1.error_currency_fetch, 500, err);
    }
};
exports.getCurrencies = getCurrencies;
