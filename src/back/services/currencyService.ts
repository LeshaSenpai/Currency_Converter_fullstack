import Currency from '../models/Currency';

export const fetchAllCurrencies = async () => {
    const currencies = await Currency.findAll();
    return currencies.map(currency => ({
        text: currency.text,
        symbol: currency.symbol,
        code: currency.code,
        currencyCode: currency.currencycode,
        rate: parseFloat(currency.rates.toString()),
    }));
};
