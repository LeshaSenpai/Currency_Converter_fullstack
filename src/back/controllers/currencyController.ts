import { Request, Response } from 'express';
import { fetchAllCurrencies } from '../services/currencyService';

export const getCurrencies = async (req: Request, res: Response) => {
    try {
        const currencies = await fetchAllCurrencies();
        res.json(currencies);
    } catch (err) {
        res.status(502).json({ error: "Ошибка при получении данных с базы" });
    }
};
    