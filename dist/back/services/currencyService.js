"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllCurrencies = void 0;
const Currency_1 = __importDefault(require("../models/Currency"));
const fetchAllCurrencies = async () => {
    const currencies = await Currency_1.default.findAll();
    return currencies.map(currency => ({
        text: currency.text,
        symbol: currency.symbol,
        code: currency.code,
        currencyCode: currency.currencycode,
        rate: parseFloat(currency.rates.toString()),
    }));
};
exports.fetchAllCurrencies = fetchAllCurrencies;
