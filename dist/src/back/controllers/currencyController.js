"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrencies = void 0;
const currencyService_1 = require("../services/currencyService");
const getCurrencies = async (req, res) => {
    try {
        const currencies = await (0, currencyService_1.fetchAllCurrencies)();
        res.json(currencies);
    }
    catch (err) {
        res.status(500).json({ error: "Ошибка при получении данных с базы" });
    }
};
exports.getCurrencies = getCurrencies;
